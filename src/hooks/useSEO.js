import { useEffect } from 'react';

/**
 * Sets document title + meta description per page.
 * Needed because this is a single-page app (one index.html) — without this,
 * every route would show the same title/description in search results.
 */
export default function useSEO(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
