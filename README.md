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
│   ├── style.css
│   ├── utility.css
│   └── variables.css
├── fonts/geist/ # Geist variable font, weights 100–900
├── gsap/        # GSAP 3.15.1 distribution files
├── icon/        # Font Awesome Free 7.3.1 files
├── images/
└── js/
    ├── footer.js
    ├── header.js
    └── main.js
```

## Development

Open `index.html` directly or serve the repository with any static HTTP server.

Add the global components to any page with `<site-header></site-header>` and `<site-footer></site-footer>`, then include their respective CSS and JavaScript files. The header includes responsive navigation and an accessible right-side About dialog.

Bootstrap is used **only** for its grid classes: `container`, `container-fluid`, `row`, and columns. Components, utilities, and other styling are custom. Project utility classes use the `u-` prefix.

Use the shared color and typography variables from `assets/css/variables.css`; do not introduce one-off brand colors in page styles.
