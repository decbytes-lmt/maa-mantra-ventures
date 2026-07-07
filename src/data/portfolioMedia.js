// Portfolio page media — NOT sourced from src/assets/portfolio (that folder only
// exists to tell us which files/titles to use). Real images + videos are pulled
// straight from the 4 service folders that already have them uploaded:
//   src/assets/brand promotions/**        -> tag "Social Media"
//   src/assets/advertising agency/**      -> tag "Ad Films"
//   src/assets/photography&videography/** -> tag "Product Shoots"
//   src/assets/event management/**        -> tag "Events"
// by reusing each service's own media file (same import.meta.glob these pages
// already use), so if a picture is added/removed there, Portfolio updates too.

import { autoplayMedia as bpAutoplay, gridMedia as bpGrid } from './brandPromotionsMedia';
import { autoplayMedia as aaAutoplay, gridMedia as aaGrid } from './advertisingAgencyMedia';
import { autoplayMedia as pvAutoplay, gridMedia as pvGrid } from './photographyMedia';
import { autoplayMedia as emAutoplay, gridMedia as emGrid } from './eventManagementMedia';
import { titleFromFilename } from '../utils/titleFromFilename';

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !/^\d+$/.test(w))
    .join(' ')
    .trim();
}

const SOURCES = [
  { items: [...bpAutoplay, ...bpGrid], tag: 'Social Media' },
  { items: [...aaAutoplay, ...aaGrid], tag: 'Ad Films' },
  { items: [...pvAutoplay, ...pvGrid], tag: 'Product Shoots' },
  { items: [...emAutoplay, ...emGrid], tag: 'Events' },
];

// The exact 13 YouTube links from the client's portfolio shortlist (portfolio_yt.txt),
// matched here by video id so we grab the already-tagged copy from whichever service
// folder has it (first match in SOURCES order wins if a clip lives in more than one).
const PORTFOLIO_VIDEO_IDS = [
  '6-D1J34eUQk', // FIZA NEXUS BINDU
  'SQMUL66zLnA', // SNOWMAN LAUNCHING reel 1
  '3y_0wXBCIyI', // FIZA NEXUS ABHISH BUILDER
  'QHt8HZEj4NQ', // palemr conv cnt
  'i4zQWZakxdk', // bindu ptr
  'NYKv8Bfk5bs', // grand inauguration ceremony reel
  'mYdb91qpV-Q', // sai radha rtx delv
  'AcJkjqEZvI8', // cpl reel clbr
  'RGhXxLKzsM8', // PRAKASH KUMPALA BABY SHOWER
  'M2iXzLV_nZE', // TANISHQ diamond REEL
  '6P87hA9CEoQ', // TANISHQ VARA AHALAKSHMI REEL
  'WgC-NG-nU3M', // BLUE BERRIES REel 2
  'VXnmTwnjVo8', // J+J_BABY_SHOWER
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const images = [];
const seenImageTitles = new Set();
const videoById = new Map();

SOURCES.forEach(({ items, tag }) => {
  items.forEach((item) => {
    if (item.type === 'image') {
      const key = normalizeTitle(titleFromFilename(item.file));
      if (seenImageTitles.has(key)) return; // same shoot already picked up from another folder
      seenImageTitles.add(key);
      images.push({ ...item, tag });
    } else if (item.type === 'video' && item.youtube && !videoById.has(item.youtube.id)) {
      videoById.set(item.youtube.id, { ...item, tag });
    }
  });
});

export const portfolioImages = shuffle(images);
export const portfolioVideos = shuffle(
  PORTFOLIO_VIDEO_IDS.map((id) => videoById.get(id)).filter(Boolean)
);
