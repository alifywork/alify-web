# ALIFY UI QA — Home and Inner Pages

Date: 2026-11-06  
Scope: all 35 HTML pages, including the homepage, service and industry profiles, project and case-study pages, blog articles, forms, and legal pages.

## Verification completed

- 175 responsive page loads at 1440, 1024, 768, 390, and 320 pixels.
- Full-page desktop screenshots and contact-sheet visual review for every page.
- Automated WCAG A/AA checks with axe-core at desktop width.
- 64 interaction assertions covering navigation, tabs, sliders, filters, FAQs, and forms.
- Static local asset, internal page, anchor, duplicate-ID, heading, and inline-style audits.

## Passing after fixes

- No horizontal page overflow at any tested width.
- No failed HTTP assets, browser JavaScript errors, duplicate IDs, missing page H1s, unnamed images, empty buttons, or empty links.
- All pages retain the global header and footer.
- Desktop services mega-menu, About drawer, sticky header, and mobile navigation work with keyboard Escape handling.
- All six homepage service tabs activate correctly; all six mobile service links remain available.
- Testimonial next and pause controls work.
- All 18 FAQ implementations pass topic filtering and empty-search-state checks.
- Project, case-study, and blog category filters return results correctly.
- Contact and Start Project required fields validate correctly.
- Footer CTA content remains visible during fast scrolling and full-page rendering.
- Final axe rechecks report no tested WCAG A/AA violations after the contrast corrections.

## Fixed during this QA pass

1. Removed footer CTA opacity animation that could leave important content hidden during fast scroll or full-page capture.
2. Corrected low-contrast eyebrows, metadata, process numbers, outcome copy, form help, project labels, pricing labels, testimonial captions, and blog metadata.
3. Added a light amber palette variable for small text on blue backgrounds.
4. Increased form-helper text size and line height.

## Remaining gaps and recommendations

These items are intentionally not marked as fixed.

| Priority | Area | Gap | Recommended action |
| --- | --- | --- | --- |
| High | `case-studies.html` | Still uses the older card composition and repeated abstract project imagery, unlike the newer Projects and Blog editorials. | Rebuild as an editorial case-study archive with distinct product visuals and a featured case narrative. |
| High | `case-study-single.html` | Still follows the older generic detail layout and lacks the stronger project-specific art direction of `project-single.html`. | Rebuild around the automation story with relevant workflow imagery, challenge/response narrative, and proposed validation measures. |
| High | Project/case detail mapping | Multiple concept cards reuse one detail template, so the selected card title does not always match the destination story. | Create dedicated detail content per concept or clearly present the existing destinations as representative template demos. |
| Medium | `pricing.html` | Functional and responsive, but visually closer to the earlier card-based system than the newest editorial pages. | Modernise package comparison and continuity sections without changing the custom-quote model. |
| Medium | `testimonials.html` | Functional and readable, but the archive composition is less distinctive than the homepage center-active slider and newer inner pages. | Refine the editorial testimonial layout while preserving demo-content labelling. |
| Medium | `service-single.html` | Legacy Web Development page duplicates `web-development.html`. | Retain as a compatibility alias or replace with a permanent redirect when routing support is available. |
| Production dependency | Contact and Start Project | Forms prepare populated `mailto:` messages; they do not submit to a server or CRM. | Connect a verified form endpoint, spam protection, success/error states, and submission monitoring before production lead capture. |
| Content dependency | Projects and testimonials | Projects are concepts and testimonials are explicitly demo content. | Replace with approved client evidence and verified outcomes before using them as marketing proof. |

## Notes

- The supplied abstract hero family remains in use as required; it is not treated as a failed asset or accidental duplication.
- Legal pages intentionally use simpler long-form compositions.
- Blog articles and industry profiles have genuine individual destinations rather than dead-end archive cards.
