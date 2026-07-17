// Root folder items  -> gridMedia (click-to-play)
// auto_play_video/*  -> autoplayMedia (plays on load, top of page)
//
// IMAGES: auto-discovered from disk (src/assets/event management/**). Drop files
//   in that folder (any name) and they show up automatically — no code change needed.
// VIDEOS: built directly from the YOUTUBE_LIST below — NOT tied to any local file,
//   same approach as brandPromotionsMedia.js / photographyMedia.js.

import { titleFromFilename } from '../utils/titleFromFilename';

// ---- Every video, title -> YouTube link (from Eventmanagement_video_link.txt) ----
const YOUTUBE_LIST = [
  ['bindu ptr', 'https://youtube.com/shorts/wstYPkzYu5k'],
  ['mg car launch', 'https://youtu.be/5GLp4wLJkzQ'],
  ['j+j baby shower', 'https://youtu.be/VXnmTwnjVo8'],
  ['prakash kumpala baby shower', 'https://youtube.com/shorts/7wB2oUJoIHU'],
  ['palemr conv cnt', 'https://youtu.be/5UDHFpjQexU'],
  ['baby shower highlights deeksha shamith bhandary', 'https://youtu.be/8hkRrTzL4uM?si=1R8muJKEmzstYNwe'],
  ['caratlane mangalore', 'https://youtube.com/shorts/1dbGM_jIE3w?si=mb1eEqR71V9qqPja'],
  ['the pride of coastalwood begins cpl 2026 inauguration', 'https://youtu.be/NuHqrQFChpg?si=OSymnBPq14CAwwbm'],
  ['cpl 2025 player auction', 'https://youtu.be/JDzD8rxM6EU?si=wIVPcVckHEdSrOH_'],
  ['cpl 2025 final', 'https://youtu.be/qGPdxX0uqWM?si=UOKlsqrCM2W4Cnbg'],
  ['cpl 2026', 'https://youtube.com/shorts/T28SfB6ietE?si=YxYdkezhd2bZTWZX'],
];

// Which titles above belong in the autoplay row at top of page.
// ASSUMPTION: none set yet — everything falls into the click grid until an
// `auto_play_video/` subfolder or a title is added here.
const AUTOPLAY_TITLES = new Set([]);

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !/^\d+$/.test(w))
    .join(' ')
    .trim();
}

function prettifyTitle(raw) {
  return raw
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w === w.toUpperCase() && w.length > 1 ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(' ');
}

function parseYouTube(url) {
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return { id: shortsMatch[1], isShort: true };
  const shortLinkMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortLinkMatch) return { id: shortLinkMatch[1], isShort: false };
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return { id: watchMatch[1], isShort: false };
  return null;
}

const autoplayMedia = [];
const gridMedia = [];

// 1. Video items — built straight from YOUTUBE_LIST, no local file required.
const coveredTitles = new Set();
YOUTUBE_LIST.forEach(([rawTitle, url], i) => {
  const parsed = parseYouTube(url);
  if (!parsed) return;
  const key = normalizeTitle(rawTitle);
  coveredTitles.add(key);
  const item = {
    file: `yt-${i}-${key.replace(/\s+/g, '-')}`, // synthetic id, only used as a React key
    type: 'video',
    src: null,
    youtube: parsed,
    title: prettifyTitle(rawTitle),
  };
  if (AUTOPLAY_TITLES.has(key)) autoplayMedia.push(item);
  else gridMedia.push(item);
});

// 2. Images (and any leftover local video not covered above) — auto-discovered from disk.
const modules = import.meta.glob('/src/assets/event management/**/*.{jpg,jpeg,png,webp,gif,bmp,avif,heic,heif,jfif,tif,tiff,mp4,mov,webm,JPG,JPEG,PNG,WEBP,GIF,BMP,AVIF,HEIC,HEIF,JFIF,TIF,TIFF,MP4,MOV,WEBM}', {
  eager: true,
  import: 'default',
});

Object.keys(modules)
  .sort()
  .forEach((path) => {
    const filename = path.split('/').pop();
    if (/(^|[^a-z0-9])copy([^a-z0-9]|$)/i.test(filename)) return; // skip duplicate '- Copy' files (handles _ - . space separators)
    const type = /\.(mp4|mov)$/i.test(filename) ? 'video' : 'image';
    if (type === 'video' && coveredTitles.has(normalizeTitle(titleFromFilename(filename)))) {
      return; // already represented by its YouTube entry above — don't also bundle the raw file
    }
    const item = { file: filename, id: path, type, src: modules[path] };
    if (/autoplay|auto_play/i.test(path)) autoplayMedia.push(item);
    else gridMedia.push(item);
  });

export { autoplayMedia, gridMedia };
