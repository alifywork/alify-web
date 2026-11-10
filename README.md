# ALIFY — Worldwide Digital Agency

A responsive agency website with 43 public HTML routes plus a branded 404 page, ten dedicated service pages, distinct archive/single presentation systems, interactive portfolio galleries, and a persistent Node.js inquiry backend. Vendor assets are local; no CDN is required.

## Run

```bash
npm install
npm start
```

The website and API listen on `0.0.0.0:8000`. Set `PORT` or `HOST` to override. `npm run check` validates the primary JavaScript files.

## Inquiry backend

- `POST /api/inquiries` accepts multipart AJAX submissions from the Homepage, Contact, and Start Project forms.
- `GET /api/health` provides a service health check.
- Each valid inquiry receives a unique `ALF-YYYYMMDD-XXXXXX` reference.
- Inquiry JSON and attachments are stored under `storage/inquiries/`, which is Git-ignored and blocked from public static serving.
- Up to three PDF, DOC, DOCX, TXT, PNG, or JPG files are accepted, 5 MB each; total requests are capped at 16 MB.
- Includes same-origin checks, required field/consent validation, honeypot handling, and basic per-IP rate limiting.
- Contact and Start Project save non-sensitive draft fields in browser local storage and restore them on return. Files and consent are not drafted.
- Production deployment needs a persistent disk and regular protected backup. Saved submissions are always the source of truth.
- Optional SMTP notification is configured through the hosting environment using `.env.example`. If SMTP is absent or fails, the inquiry still saves successfully and returns its reference. No credentials are stored in Git.
- Run `npm run inquiries:export` on the server to create a UTF-8 CSV in the Git-ignored private `storage/exports/` directory. Exports contain personal inquiry data and must be handled securely.

## Front-end structure

```text
index.html
server.js
assets/
├── bootstrap/   # Grid only: containers, rows, columns
├── css/         # Custom design systems and revision.css
├── fonts/geist/ # Local variable font
├── gsap/        # Local GSAP + ScrollTrigger
├── icon/        # Local Font Awesome Free
├── images/      # Local heroes, service scenes, industries, logos
└── js/          # Header, footer, home, pages and revision interactions
```

The header exposes all ten services: Web Development, WordPress Development, Shopify Development, SEO, Digital Marketing, Content Writing, UI/UX Design, Graphic Design, Logo Design, and AI Automation.

Home includes a one-at-a-time industry carousel, responsive project grid, contextual section CTAs, and AJAX inquiry. All six project stories include a native-dialog lightbox. Blog filters persist in the URL and long articles include reading progress. Testimonials remain explicitly labelled demo content.

Inner pages retain the intentional reusable neon `<page-hero>` art direction. Services, Projects, Industries, and Case Studies have dedicated archive and single routes with different information-design systems.

Bootstrap is used **only** for `container`, `container-fluid`, `row`, and column classes. Semantic sections follow `section > container/container-fluid > row > column > content`. Brand colours and typography come from `assets/css/variables.css`; no inline styles are authored.

## Content references

- `PRICING-RESEARCH.md` documents comparable published pricing sources.
- `REVISION-QA.md` records implementation and final validation.
- Earlier audit reports remain for historical context; the revision brief supersedes their open recommendations where explicitly addressed.
