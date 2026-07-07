// Root folder items  -> gridMedia (click-to-play)
// auto_play_video/*  -> autoplayMedia (plays on load, top of page)
//
// IMAGES: auto-discovered from disk (src/assets/advertising agency/**). Drop files
//   in that folder (any name) and they show up automatically — no code change needed.
// VIDEOS: built directly from the YOUTUBE_LIST below — NOT tied to any local file,
//   same approach as brandPromotionsMedia.js / photographyMedia.js.

import { titleFromFilename } from '../utils/titleFromFilename';

// ---- Every video, title -> YouTube link (from Adversting_agency_video_link.txt) ----
const YOUTUBE_LIST = [
  ['fiza nexus abhish', 'https://youtube.com/shorts/D0oh-GdMeVM'],
  ['grand inauguation ceremony snowman', 'https://youtube.com/shorts/qBxAetWQ1Ig'],
  ['tanishq varamahalaks', 'https://youtube.com/shorts/MySfCoIIC0M'],
  ['rohan corporation', 'https://youtu.be/oaHCfhY6JKU'],
  ['ask broadband services', 'https://youtu.be/MwIyWcCtZg8'],
  ['seasons fresh super market', 'https://youtu.be/LNPS9Oue6D4'],
  ['snowman strawberry', 'https://youtube.com/shorts/h0nv0xGH0rw'],
  ['blue berries snow man', 'https://youtube.com/shorts/R9K1t4qjIT8'],
  ['tanishq diamond', 'https://youtube.com/shorts/UI8lC7Fqqwo'],
  ['snow man opening', 'https://youtube.com/shorts/3gtDo9PwS1o'],
  ['snowman launching', 'https://youtube.com/shorts/j5pzwhgE-ys'],
  ['snowman opening', 'https://youtube.com/shorts/c8FAfQtqukI'],
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
const modules = import.meta.glob('/src/assets/advertising agency/**/*.{jpg,jpeg,png,webp,mp4,mov,JPG,JPEG,PNG,MP4}', {
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
