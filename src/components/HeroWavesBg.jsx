import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './HeroWavesBg.css';

export default function HeroWavesBg() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer = null;
    let scene, camera, mats, pMat, clock;
    let animId = null;
    let onResize, onMove, ro, onContextLost;
    let cancelled = false;

    const init = () => {
      if (cancelled || !mount.isConnected) return;

      const W = mount.clientWidth || mount.parentElement?.clientWidth || window.innerWidth;
      const H = mount.clientHeight || mount.parentElement?.clientHeight || window.innerHeight;
      if (!W || !H) return;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
      } catch (e) {
        console.warn('HeroWavesBg: WebGL unavailable, skipping animated background.', e);
        return;
      }
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      onContextLost = (e) => { e.preventDefault(); console.warn('HeroWavesBg: WebGL context lost.'); };
      renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
      camera.position.set(0, 0, 6);

      const makeWave = (color1, color2, zPos, rotZ, opacityMult, timeOffset) => {
        const geo = new THREE.PlaneGeometry(22, 12, 160, 80);
        const mat = new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
          uniforms: {
            uTime: { value: timeOffset },
            uColor1: { value: new THREE.Color(color1) },
            uColor2: { value: new THREE.Color(color2) },
            uOpacity: { value: opacityMult },
          },
          vertexShader: `
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;
            void main() {
              vUv = uv;
              vec3 pos = position;
              float w1 = sin(pos.x * 0.6 + uTime * 0.5) * 0.5;
              float w2 = sin(pos.x * 1.1 - uTime * 0.35 + pos.y * 0.4) * 0.3;
              float w3 = cos(pos.y * 0.7 + uTime * 0.28) * 0.25;
              float w4 = sin(pos.x * 1.8 + pos.y * 0.9 + uTime * 0.6) * 0.15;
              pos.z += w1 + w2 + w3 + w4;
              vElevation = pos.z;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform float uOpacity;
            varying vec2 vUv;
            varying float vElevation;
            void main() {
              float t = clamp((vElevation + 1.0) / 2.0, 0.0, 1.0);
              vec3 color = mix(uColor1, uColor2, t);
              float ex = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
              float ey = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y);
              float alpha = ex * ey * uOpacity * (t * 0.65 + 0.2);
              gl_FragColor = vec4(color, alpha);
            }
          `,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.z = zPos;
        mesh.rotation.z = rotZ;
        scene.add(mesh);
        return mat;
      };

      mats = [
        makeWave('#a07820', '#f0c869', -2.0,  0.0,  0.22, 0.0),
        makeWave('#d4a843', '#f0c869', -1.2,  0.08, 0.18, 2.5),
        makeWave('#c49030', '#ffd978', -0.5, -0.06, 0.14, 5.0),
        makeWave('#d4a843', '#ffe090',  0.1,  0.12, 0.10, 7.5),
      ];

      // Particles
      const PC = 350;
      const pos = new Float32Array(PC * 3);
      const sizes = new Float32Array(PC);
      const phases = new Float32Array(PC);
      for (let i = 0; i < PC; i++) {
        pos[i*3]   = (Math.random() - 0.5) * 20;
        pos[i*3+1] = (Math.random() - 0.5) * 10;
        pos[i*3+2] = (Math.random() - 0.5) * 4;
        sizes[i]   = Math.random() * 3.5 + 1;
        phases[i]  = Math.random() * Math.PI * 2;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1));
      pGeo.setAttribute('aPhase',   new THREE.BufferAttribute(phases, 1));

      pMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(0xf0c869) } },
        vertexShader: `
          attribute float aSize;
          attribute float aPhase;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec3 p = position;
            p.y += sin(uTime * 0.35 + aPhase) * 0.4;
            p.x += cos(uTime * 0.28 + aPhase * 1.2) * 0.25;
            vAlpha = (sin(uTime * 0.7 + aPhase) * 0.5 + 0.5) * 0.8 + 0.2;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = aSize * (280.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float s = pow(1.0 - d * 2.0, 2.5);
            gl_FragColor = vec4(uColor, s * vAlpha * 0.85);
          }
        `,
      });
      scene.add(new THREE.Points(pGeo, pMat));

      // Mouse
      const mouse = { x: 0, y: 0 };
      onMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMove);

      clock = new THREE.Clock();
      const tick = () => {
        animId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();
        mats.forEach((m, i) => { m.uniforms.uTime.value = t + i * 2.5; });
        pMat.uniforms.uTime.value = t;
        camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.03;
        camera.position.y += (mouse.y * 0.25 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      tick();

      onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      ro = new ResizeObserver(onResize);
      ro.observe(mount);
    };

    // Wait two frames before measuring/initializing — on first mount
    // (especially mobile) the aspect-ratio box / webfonts may not have
    // settled layout yet, which previously caused a visible "jump" once
    // ResizeObserver corrected the size a moment later.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(init);
      cleanupRafs.push(raf2);
    });
    const cleanupRafs = [raf1];

    return () => {
      cancelled = true;
      cleanupRafs.forEach((id) => cancelAnimationFrame(id));
      if (animId !== null) cancelAnimationFrame(animId);
      if (ro) ro.disconnect();
      if (onMove) window.removeEventListener('mousemove', onMove);
      if (onResize) window.removeEventListener('resize', onResize);
      if (renderer) {
        if (onContextLost) renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return <div className="hero-waves-bg" ref={mountRef} />;
}
