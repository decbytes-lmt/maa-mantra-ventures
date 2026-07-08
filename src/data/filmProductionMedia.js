// Root folder items  -> gridMedia (click-to-play)
// auto_play_video/*  -> autoplayMedia (plays on load, top of page)
//
// VIDEOS: built directly from the YOUTUBE_LIST below — NOT tied to any local file,
//   same approach as brandPromotionsMedia.js / photographyMedia.js.
// IMAGES: auto-discovered from disk (src/assets/film production/**) if that folder
//   is ever added — safe to leave even if the folder doesn't exist yet.

import { titleFromFilename } from '../utils/titleFromFilename';

// ---- Every video, title -> YouTube link (from Film_production.txt) ----
const YOUTUBE_LIST = [
  ['namma kudla tulu movie trailer', 'https://youtu.be/9Tx7JJWkxXs?si=ff44ONf2rP-7TTCI'],
  ['namma kudla tulu film love sequence', 'https://youtu.be/up1-s1cmPPc?si=qaGHRT1VX-pFoJ_y'],
  ['kushi films rajivi & family', 'https://youtu.be/67uleoIsjfc?si=vHZwgtq5h-wEkOXh'],
  ['kushi films episode6 appi ajji story', 'https://youtu.be/jh0wo1Nlxgk?si=xUaXKR0nVeAT1Y1C'],
  ['namma kudla tulu movie uattara korpana video song', 'https://youtu.be/ftOoO2N3rZ0?si=7RiE-dFC302LuL5v'],
  ['namma kudla tulu movie first look trailer', 'https://youtu.be/B4q7ZRHneHw?si=GlPp3PTimsmqThAC'],
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

// 2. Images (and any leftover local video not covered above) — auto-discovered from disk,
//    if a `src/assets/film production/` folder is ever added. Safe no-op until then.
const modules = import.meta.glob('/src/assets/film production/**/*.{jpg,jpeg,png,webp,mp4,mov,JPG,JPEG,PNG,MP4}', {
  eager: true,
  import: 'default',
});

Object.keys(modules)
  .sort()
  .forEach((path) => {
    const filename = path.split('/').pop();
    const type = /\.(mp4|mov)$/i.test(filename) ? 'video' : 'image';
    if (type === 'video' && coveredTitles.has(normalizeTitle(titleFromFilename(filename)))) {
      return; // already represented by its YouTube entry above — don't also bundle the raw file
    }
    const item = { file: filename, type, src: modules[path] };
    if (/autoplay|auto_play/i.test(path)) autoplayMedia.push(item);
    else gridMedia.push(item);
  });

export { autoplayMedia, gridMedia };
