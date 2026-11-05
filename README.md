# alify-web

A static front-end starter with all vendor assets stored locally. No CDN is required.

## Structure

```text
index.html
assets/
├── bootstrap/   # Bootstrap 5.3.8 distribution files
├── css/
│   ├── fonts.css
│   ├── footer.css
│   ├── header.css
│   ├── page-hero.css
│   ├── style.css
│   ├── utility.css
│   └── variables.css
├── fonts/geist/ # Geist variable font, weights 100–900
├── gsap/        # GSAP 3.15.1 distribution files
├── icon/        # Font Awesome Free 7.3.1 files
├── images/
│   ├── background/ # Neon hero backgrounds
│   └── logo/       # Light and dark Alify logos
└── js/
    ├── footer.js
    ├── header.js
    ├── main.js
    └── page-hero.js
```

## Pages

The site includes hero-only templates for Home, About, Contact, Start a Project, Services (archive/single), Projects (archive/single), Industries (archive/single), Case Studies (archive/single), FAQs, Testimonials, Pricing, Privacy Policy, Terms & Conditions, and Cookie Policy. All pages use the global header and footer components.

Inner pages use the reusable `<page-hero>` component with `eyebrow`, `title`, `description`, and `background` attributes. Its styles, rendering, GSAP entrance animation, and scroll parallax live in `assets/css/page-hero.css` and `assets/js/page-hero.js`.

## Development

Open `index.html` directly or serve the repository with any static HTTP server.

Add the global components to any page with `<site-header></site-header>` and `<site-footer></site-footer>`, then include their respective CSS and JavaScript files. The header includes responsive navigation and an accessible right-side About dialog. It overlays the hero with the light logo, then switches to a compact centered glass container with the sticky logo after 40px of scrolling.

Bootstrap is used **only** for its grid classes: `container`, `container-fluid`, `row`, and columns. Components, utilities, and other styling are custom. Project utility classes use the `u-` prefix.

Use the shared color and typography variables from `assets/css/variables.css`; do not introduce one-off brand colors in page styles.
