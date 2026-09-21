# Ngu Smith — Animated Kelly-Inspired Portfolio

A customized multi-page portfolio inspired by the Kelly layout, rebuilt around Ngu Smith's profile with additional motion and small interactive touches.

## Features
- Kelly-inspired clean navigation and page structure, now including a dedicated **Certificates** page
- Scroll reveal animations and animated counters
- Typing headline
- Scroll progress indicator
- Custom cursor on pointer devices
- Magnetic buttons
- Project category filters
- **Clickable project cards** — click (or press Enter/Space) any project on the Portfolio page to open a detail modal with a fuller description, tags, and a link to the real GitHub profile
- **Certificates page** — real graduation/certificate photos and a CV preview, click any image to view it full-size (GLightbox), plus a working "Download CV" button
- **Light / dark mode toggle** — the moon/sun icon in the header, persisted across visits via localStorage, and respects the visitor's OS preference on first visit
- **Language switcher** — the globe icon in the header offers the top 10 most-spoken languages worldwide (English, Mandarin Chinese, Hindi, Spanish, Arabic, French, Bengali, Portuguese, Russian, Urdu), switching navigation, buttons, and page headings live, with Arabic/Urdu correctly switching the page to right-to-left layout
- Animated skill bars
- Copy-email interaction
- Responsive mobile navigation
- Reduced-motion accessibility support

Open `index.html` in a browser or serve the folder with a local web server.

## Translation scope — please read
The language switcher translates **UI chrome**: navigation, buttons, page titles/eyebrows, and the hero tagline — enough that the whole site is genuinely navigable in each language. It intentionally does **not** machine-translate the long-form personal paragraphs (About text, project descriptions, experience details), since translating that much nuanced personal writing automatically risks losing accuracy in a way that matters for something like a portfolio. Those stay in English across all languages. If you want full-page translation later, the cleanest path is to have a native speaker (or a follow-up pass) translate the specific paragraphs and add them as additional `data-i18n` keys — the mechanism is already in place in `assets/js/i18n-data.js` and `assets/js/main.js`, so it's a content addition, not a rebuild.

## Certificates page — please verify
`certificates.html` uses three real images already in your project's assets: two photos from your graduation/certificate moment, and a preview of your CV. Double-check these are the images you actually want public-facing before sharing the link — swap `assets/img/certificate-graduation.jpeg`, `assets/img/certificate-portrait.jpeg`, or `assets/img/cv-preview.png` for different files if you'd prefer, keeping the same filenames (or update the `<img src>` paths in `certificates.html` if you rename them).

## Changelog — this update

- **Fixed the theme-switch flash.** Toggling light/dark now crossfades smoothly instead of snapping — the previous instant, untransitioned background change on the hero and page headers was what read as a "sparkle" of white light.
- **Project links are now real and per-project.** Each project's detail popup shows the actual relevant links instead of one generic profile link:
  - **SmithGo Express** — "View on GitHub" and "Open live site" (`smithgo-express.netlify.app`)
  - **Inventory Management, Online Marketplace, Digital Queue Management, Employee Management** — "View on GitHub" (general profile, since these don't have confirmed individual repo URLs yet — send me real ones and I'll wire each to its own link)
  - **Graphic Design Work** — an honest "gallery coming soon" note instead of a fake link, since this one's waiting on real design pieces
- **Services page rebuilt as a two-sided split** — "Engineering & Web" and "Graphic Design" as genuinely distinct panels (different accent color, icon language, and content structure per side) rather than one uniform grid of identical cards, joined by a center seam. The Graphic Design side currently shows an honestly-labeled empty state for your upcoming design work — swap it out once you have real pieces to show (see `.design-empty` in `services.html`, and drop images into a `.design-panel` gallery the same way `certificates.html` does).
