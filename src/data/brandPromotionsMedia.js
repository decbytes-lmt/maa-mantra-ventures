// Root folder items  -> gridMedia (click-to-play)
// auto_play_video/*  -> autoplayMedia (plays on load, top of page)
//
// IMAGES: auto-discovered from disk as before (src/assets/brand promotions/**).
// VIDEOS: built directly from the YOUTUBE_LIST below — NOT tied to any local file.
//   This matters: if the local raw video is deleted (which it now is, to keep the
//   repo/deploy small), the video item still exists and still renders, because it
//   never depended on the file being on disk in the first place.

import { titleFromFilename } from '../utils/titleFromFilename';

// ---- Every video, title -> YouTube link ----
// If two different clips legitimately share the same title, list both links under it in
// upload order — first one goes to the first slot that title fills, second to the next.
const YOUTUBE_LIST = [
  ['bindu ptr', 'https://youtube.com/shorts/i4zQWZakxdk?si=TEKj6bWXV3CDsgw1'],
  ['riviera inn', 'https://youtube.com/shorts/gYc8F7ss3rY?si=9SqC6wSJbWA19bUn'],
  ['sai radha rtx delv', 'https://youtube.com/shorts/mYdb91qpV-Q?si=eWU0dEWqnGXgViIa'],
  ['grand inauguration ceremony reel', 'https://youtube.com/shorts/NYKv8Bfk5bs?si=FYcZOBL28DmyVCV_'],
  ['bindu new drink launch reel', 'https://youtube.com/shorts/BdgeUewRDEQ?si=JENQbtodwdYa78NH'],
  ['fiza nexus abhish builder', 'https://youtube.com/shorts/3y_0wXBCIyI?feature=share'],
  ['snow man opening 2', 'https://youtube.com/shorts/hO5JHQHPPD4?si=II8FSum8rpC00cTP'],
  ['snowman launching reel', 'https://youtube.com/shorts/9qStvXF_dH4?si=Ysyf_ctQqrhZkxvQ'],
  ['bindu new drink launch reel', 'https://youtube.com/shorts/SzucNc57SOY?feature=share'],
  ['blue berries reel 2', 'https://youtube.com/shorts/WgC-NG-nU3M?feature=share'],
  ['fiza nexus bindu', 'https://youtube.com/shorts/6-D1J34eUQk?feature=share'],
  ['ask broadband', 'https://youtu.be/2mWw3ljtDDg?si=x67zi3I-OzwwlwLG'],
  ['snowman launching reel 1', 'https://youtube.com/shorts/SQMUL66zLnA?feature=share'],
  ['snowman strawberry reel 4', 'https://youtube.com/shorts/cv4KeUCH0pI?feature=share'],
  ['raider reels grp', 'https://youtube.com/shorts/ZlfgjCfYEvE?feature=share'],
  ['gl acharya', 'https://youtu.be/fwKTJXuRYZo?si=5NeggVq9KvUJbVwP'],
  ['rohan corporation', 'https://youtu.be/A7KvXUvViLY?si=9QjG7UtKGfAHg0NL'],
  ['seasons fresh super market', 'https://youtu.be/bf5DIjnapTM?si=Rxi2gyq2Xj-BrDyb'],
  ['prakasha motors davangere', 'https://youtube.com/shorts/uTrGTiVrD_g?si=rANgc4sOOJXZxec6'],
  ['hero west coast destiny tvc ad', 'https://youtu.be/jAgonuHV6lY?si=EZsya4BQSAhkMDm9'],
  ['caratlane mangalore', 'https://youtube.com/shorts/1dbGM_jIE3w?si=mb1eEqR71V9qqPja'],
  ['shridhar bplus', 'https://youtu.be/QtgtiM-SpWw?si=3gNT3zttDspDKNbG'],
];

// Which of the titles above belong in the autoplay row at the top of the page (confirmed
// from the actual auto_play_video/ folder contents). Everything else goes in the click grid.
const AUTOPLAY_TITLES = new Set([
  'bindu ptr',
  'grand inauguration ceremony reel',
  'palemr conv cnt',
  'sai radha rtx delv',
]);

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !/^\d+$/.test(w)) // drop standalone number tokens, same as titleFromFilename
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

// 2. Images (and any leftover local video not covered above) — auto-discovered as before.
const modules = import.meta.glob('/src/assets/brand promotions/**/*.{jpg,jpeg,png,webp,mp4,mov,JPG,JPEG,PNG,MP4}', {
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
    if (path.includes('/auto_play_video/')) autoplayMedia.push(item);
    else gridMedia.push(item);
  });

export { autoplayMedia, gridMedia };
