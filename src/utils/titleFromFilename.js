/**
 * Turns a raw filename into a display title.
 * Strips extension, splits on _ - . , keeps ALL-CAPS words as-is (acronyms like MG, TVS, RTX),
 * Title-Cases everything else.
 *
 * "bindu_new_drink_launch_reel.mp4"      -> "Bindu New Drink Launch Reel"
 * "MG_new_car_launch_majestor.jpg"       -> "MG New Car Launch Majestor"
 * "jewellery_shoot_(1)___.jpg"           -> "Jewellery Shoot (1)"
 *
 * NOTE: files that only differ by trailing _ / - / . (e.g. "launch", "launch_", "launch__")
 * collapse to the SAME title. That's expected — see rename list in chat if you want unique captions.
 */
export function titleFromFilename(filename) {
  const base = filename.replace(/\.[^/.]+$/, ''); // drop extension
  const words = base
    .split(/[_\-.]+/)
    .filter(Boolean)
    .filter((w) => !/^\d+$/.test(w)); // drop standalone number tokens (e.g. rename suffixes)
  return words
    .map((w) => (w === w.toUpperCase() ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(' ');
}
