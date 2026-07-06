import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import './GoldParticleTerrain.css';

/* Deterministic PRNG (mulberry32) — React requires render/useMemo bodies to be
   pure, so plain Math.random() (impure, non-reproducible) is not allowed here.
   Same seed always yields same sequence, keeping memoized geometry stable. */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   Simplex noise (Ashima Arts) — GLSL, embedded as a function string used by
   both terrain and dust shaders. Standard, battle-tested 3D simplex noise.
   ────────────────────────────────────────────────────────────────────────── */
const SIMPLEX_GLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/* ──────────────────────────────────────────────────────────────────────────
   Terrain — a grid of points displaced on Y by simplex noise, shader-driven.
   Color ramps from dim amber (back/edges) to bright hot gold (center-right
   highlight ridge), with a soft radial falloff so edges fade into the dark.
   ────────────────────────────────────────────────────────────────────────── */
function GoldTerrain({ mouse, count }) {
  const ref = useRef();
  const matRef = useRef();

  const { positions, gridW, gridH } = useMemo(() => {
    // count scales grid resolution; ~ (gridW * gridH) total particles
    const gridW = Math.round(Math.sqrt(count * 2.1));
    const gridH = Math.round(count / gridW);
    const positions = new Float32Array(gridW * gridH * 3);

    const spanX = 34; // world units wide
    const spanZ = 20; // world units deep

    let p = 0;
    for (let iz = 0; iz < gridH; iz++) {
      for (let ix = 0; ix < gridW; ix++) {
        const u = ix / (gridW - 1);
        const v = iz / (gridH - 1);
        const x = (u - 0.5) * spanX;
        const z = (v - 0.5) * spanZ;
        positions[p++] = x;
        positions[p++] = 0; // y displaced in shader
        positions[p++] = z;
      }
    }
    return { positions, gridW, gridH };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // per-vertex random seed used for size/alpha jitter
    const seeds = new Float32Array(gridW * gridH);
    const rand = mulberry32(gridW * 1000 + gridH);
    for (let i = 0; i < seeds.length; i++) seeds[i] = rand();
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, [positions, gridW, gridH]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorDim: { value: new THREE.Color('#5c3f15') },
      uColorGold: { value: new THREE.Color('#d4af37') },
      uColorHot: { value: new THREE.Color('#ffe7a8') },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
      matRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouse.current.x, mouse.current.y),
        0.04
      );
    }
  });

  const vertexShader = `
    ${SIMPLEX_GLSL}
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uPixelRatio;
    attribute float aSeed;
    varying float vHeight;
    varying float vGlow;
    varying float vEdgeFade;
    varying float vSeed;

    void main() {
      vec3 pos = position;

      // Slow luxurious drift: large-scale low-frequency simplex noise,
      // animated by translating the sample point over time (not scaling freq).
      float n1 = snoise(vec3(pos.x * 0.085, pos.z * 0.12, uTime * 0.06));
      float n2 = snoise(vec3(pos.x * 0.16 + 10.0, pos.z * 0.22 + 10.0, uTime * 0.045)) * 0.5;
      float height = (n1 + n2) * 1.4;

      // Gentle mouse-driven parallax: nearby particles lift slightly toward cursor.
      vec2 toMouse = uMouse * 6.0 - pos.xz * 0.02;
      float proximity = exp(-length(pos.xz - uMouse * 10.0) * 0.06);
      height += proximity * 0.35;

      pos.y += height;

      // Radial falloff from a focal point shifted center-right & toward camera,
      // so the brightest, most "solid" terrain sits center-right as requested.
      vec2 focal = vec2(9.0, 6.0);
      float distFromFocal = distance(pos.xz, focal);
      float edgeFade = smoothstep(20.0, 6.0, distFromFocal);

      vHeight = height;
      vGlow = smoothstep(0.35, 1.1, height) * edgeFade;
      vEdgeFade = edgeFade;
      vSeed = aSeed;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (1.6 + vGlow * 2.4 + aSeed * 1.2) * uPixelRatio * (60.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorDim;
    uniform vec3 uColorGold;
    uniform vec3 uColorHot;
    varying float vHeight;
    varying float vGlow;
    varying float vEdgeFade;
    varying float vSeed;

    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      if (d > 0.5) discard;
      float circle = pow(1.0 - d * 2.0, 2.0);

      vec3 color = mix(uColorDim, uColorGold, smoothstep(-0.3, 0.6, vHeight));
      color = mix(color, uColorHot, vGlow);

      float alpha = circle * vEdgeFade * (0.22 + vGlow * 0.45) * (0.6 + vSeed * 0.4);
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <points ref={ref} geometry={geometry} position={[2, -3.6, -5]} rotation={[-0.08, 0, 0]}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Floating dust — sparse, slow-rising gold motes above the terrain, in the
   upper region kept "mostly clean" so the dust must stay faint & sparse.
   ────────────────────────────────────────────────────────────────────────── */
function GoldDust({ count }) {
  const ref = useRef();
  const matRef = useRef();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 2); // [riseSpeed, sway phase]
    const rand = mulberry32(count + 7);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (rand() - 0.5) * 30;
      positions[i * 3 + 1] = (rand() - 0.5) * 14 - 1;
      positions[i * 3 + 2] = (rand() - 0.5) * 18;
      seeds[i * 2 + 0] = 0.15 + rand() * 0.35;
      seeds[i * 2 + 1] = rand() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 2));
    return geo;
  }, [positions, seeds]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#f0c869') },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    []
  );

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uPixelRatio;
    attribute vec2 aSeed;
    varying float vAlpha;

    void main() {
      vec3 pos = position;
      float riseSpeed = aSeed.x;
      float phase = aSeed.y;

      // Rise slowly, wrap around when it goes above the visible band.
      float travel = mod(uTime * riseSpeed + phase * 2.0, 16.0);
      pos.y += travel - 8.0;

      // Gentle horizontal sway.
      pos.x += sin(uTime * 0.25 + phase) * 0.6;

      // Fade in near the bottom, fade out near the top of its travel.
      float band = pos.y + 8.0; // 0..16 roughly
      vAlpha = smoothstep(0.0, 3.0, travel) * (1.0 - smoothstep(11.0, 16.0, travel));

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (1.2 + sin(phase) * 0.4) * uPixelRatio * (50.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      float d = distance(gl_PointCoord, vec2(0.5));
      if (d > 0.5) discard;
      float circle = pow(1.0 - d * 2.0, 2.0);
      gl_FragColor = vec4(uColor, circle * vAlpha * 0.55);
    }
  `;

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Mouse parallax: tracks normalized pointer position, exposed via ref so
   both terrain and (optionally) camera can react without re-rendering React.
   ────────────────────────────────────────────────────────────────────────── */
function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return mouse;
}

function CameraRig({ mouse }) {
  useFrame((state) => {
    const targetX = mouse.current.x * 0.6;
    const targetY = 1.4 + mouse.current.y * 0.25;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, -1.5, -4);
  });
  return null;
}

function Scene({ particleCount, dustCount }) {
  const mouse = useMouseParallax();
  return (
    <>
      <CameraRig mouse={mouse} />
      <GoldTerrain mouse={mouse} count={particleCount} />
      <GoldDust count={dustCount} />
      <fog attach="fog" args={['#050505', 8, 26]} />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Responsive particle budget — fewer particles on small / low-power screens.
   ────────────────────────────────────────────────────────────────────────── */
function calcCounts() {
  if (typeof window === 'undefined') return { particleCount: 26000, dustCount: 140 };
  const w = window.innerWidth;
  const isCoarse = window.matchMedia?.('(pointer: coarse)')?.matches;
  if (w < 600) return { particleCount: isCoarse ? 6000 : 9000, dustCount: 50 };
  if (w < 1000) return { particleCount: 14000, dustCount: 90 };
  return { particleCount: 26000, dustCount: 140 };
}

function useResponsiveCounts() {
  // Lazy initializer computes the correct value up front instead of
  // rendering a default then immediately setState-ing inside an effect.
  const [counts, setCounts] = useState(calcCounts);

  useEffect(() => {
    const onResize = () => setCounts(calcCounts());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return counts;
}

/* ──────────────────────────────────────────────────────────────────────────
   Public component — drop this behind your hero content.
   Usage:
     <div className="hero" style={{ position: 'relative' }}>
       <GoldParticleTerrain />
       <div className="hero-inner">...your existing text/buttons...</div>
     </div>
   ────────────────────────────────────────────────────────────────────────── */
export default function GoldParticleTerrain({ className = '' }) {
  const { particleCount, dustCount } = useResponsiveCounts();
  const [dpr] = useState(() =>
    typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio || 1, 2)
  );

  return (
    <div className={`gold-terrain-bg ${className}`}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.4, 6], fov: 55, near: 0.1, far: 60 }}
      >
        <color attach="background" args={['#050505']} />
        <Scene particleCount={particleCount} dustCount={dustCount} />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.28}
            luminanceThreshold={0.45}
            luminanceSmoothing={0.3}
            mipmapBlur
            radius={0.4}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.55} />
        </EffectComposer>
      </Canvas>
      <div className="gold-terrain-haze" />
    </div>
  );
}
