// Turns a media filename (e.g. "corporate-launch-event_02.jpg" or a full
// path like "img/wedding_stage_1.png") into a readable display title
// (e.g. "Corporate Launch Event"). Used as a fallback whenever a media
// item doesn't have an explicit `title` set.

export function titleFromFilename(file) {
  if (!file) return '';

  const base = file
    .split('/')
    .pop()
    .replace(/\.[^./]+$/, ''); // strip extension

  const words = base
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((w) => w && !/^\d+$/.test(w)); // drop standalone number tokens

  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
