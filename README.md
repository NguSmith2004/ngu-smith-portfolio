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

- **Certificates page rebuilt with your real documents**, organized into three sections:
  - **Academic** — HND Success Testimonial/Transcript, GCE Advanced Level Certificate, Attestation of Completion of Study, and School Attendance Certificate (all from your uploaded PDFs, cleaned up and cropped for a proper presentation)
  - **Professional** — DobreTech internship completion certificate, and your Open Dreams Graduate Summit certificate of participation paired with your photo from the event
  - **CV** — your actual CV, with a preview thumbnail that opens the real PDF, plus a working download button
- **Two documents were deliberately left out**, and I want to be upfront about why rather than silently skip them: your national ID card scan and your Nestlé/EAS employment contract both contain sensitive personal data (full ID number, signatures, and in the contract's case, phone numbers and salary) that shouldn't go on a public website. If you need a way to prove identity/employment to someone specific, that's better done privately (email, a password-protected share) than on a public portfolio page.
- The photographed certificates (which were shot on a fabric background) have been cropped to just the document itself for a clean, professional look.

## Fixed the theme-switch flash

Toggling light/dark now crossfades smoothly instead of snapping — the previous instant, untransitioned background change on the hero and page headers was what read as a "sparkle" of white light.

## Project links

The project detail modal on the Portfolio page shows real per-project links:
- **SmithGo Express** — "View on GitHub" and "Open live site" (`smithgo-express.netlify.app`)
- **Inventory Management, Online Marketplace, Digital Queue Management, Employee Management** — "View on GitHub" (general profile — send me real individual repo URLs and I'll wire each one specifically)
- **Graphic Design Work** — an honest "gallery coming soon" note instead of a fake link

## Services page

Rebuilt as a two-sided split — "Engineering & Web" and "Graphic Design" — each with its own accent color and content structure rather than one uniform grid of identical cards. The Graphic Design side has an honestly-labeled empty state ready for you to swap in real design pieces once you have them.
