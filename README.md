# Maa Mantra Ventures — Website

React + Vite multi-page site for Maa Mantra Ventures (events, ad films, social media marketing). 

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production     

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to any static host (Vercel, Netlify, etc).

## Structure

- `src/pages/Home.jsx` — landing page (hero, services, portfolio, testimonials, CTA)
- `src/pages/AdFilms.jsx`, `SocialMediaMarketing.jsx`, `EventManagement.jsx` — the 3 service detail pages, built on the shared `ServiceDetail.jsx` template
- `src/pages/About.jsx`, `Portfolio.jsx`, `Testimonials.jsx`, `Contact.jsx` — supporting pages
- `src/components/` — Navbar, Footer, Reveal (scroll animation), FloatingWhatsapp
- Colors/fonts are defined as CSS variables at the top of `src/index.css` — change them there to restyle the whole site

## Notes

- Clicking the 3 service cards on the homepage (Ad Films / Social Media Marketing / Event Management) routes to their own dedicated pages with features, process steps, gallery and FAQs — ready for you to swap in real copy, images and case studies.
- The contact form is UI-only right now (no backend wired up yet) — happy to connect it to email/CRM when you're ready.
- All images are placeholder gradient blocks — swap in real photos/video thumbnails when available.
