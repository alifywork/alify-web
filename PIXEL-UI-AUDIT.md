# ALIFY — Page-by-Page Pixel UI Audit

Audit date: 2026-11-06  
Branch: `arena/08a66435-alify-web`  
Base reviewed: current PR #1 implementation

## Scope and method

- Reviewed all 39 HTML routes individually at 1440 px desktop and 390 px mobile, with the existing 1024, 768, and 320 px responsive regression results also considered.
- Captured full-page renders, section-level homepage renders, computed section heights, visible text geometry, target sizes, and browser errors.
- Compared pages within each family for composition, artwork, section order, density, mobile length, repetition, and task completion.
- Full-page screenshot tiles that duplicated or blanked animating content were excluded as capture artefacts; section-level renders were used to verify those areas.

**Technical baseline remains good:** no reproducible horizontal page overflow, missing local asset, browser JavaScript error, or new axe violation was found. The gaps below are primarily visual differentiation, information design, content credibility, and conversion UX—not basic responsiveness.

## Severity

- **P1 — High:** materially weakens the page's purpose or creates substantial repetition/effort.
- **P2 — Medium:** visible design/content-depth gap that should be addressed in the next design pass.
- **P3 — Low:** polish, consolidation, or optional enhancement.

## Cross-site findings

### P1 — Inner heroes use different files but effectively the same art direction

All 38 inner routes use the same dark neon-line hero composition. Fourteen background variants and mirror/close-up/soft-focus treatments change cropping, not the underlying visual language. Most heroes are exactly 346 px tall at 1440 px; longer headings increase a few to 454 px. Service, industry, project, article, legal, contact, and pricing families therefore enter through nearly the same visual experience.

**Correction:** retain the reusable component and supplied image family, but create meaningfully different compositions per family: service diagram-led, industry photography-led, project interface-led, editorial typography-led, and utility/legal minimal-led.

### P1 — Service, industry, and project families remain structurally repetitive

- Six service profiles repeat the same seven-section sequence; shared process sections are exactly 636 px high.
- Five industry profiles repeat the same eight-section sequence, including 873 px capability, 717 px engagement, 551 px related-industry, and 612 px FAQ sections.
- Six project stories repeat overview → challenge → response → experience → artefacts → validation → next project. Most artefact sections are exactly 1346 px and most validation sections exactly 615 px.

Alternating columns and accent colours do not remove the repeated reading rhythm.

**Correction:** keep shared design tokens, but give each page two or three genuinely different editorial modules and vary section order based on the story.

### P1 — Projects and Case Studies have insufficiently distinct purposes

Both archives present the same six concept destinations with similar thumbnails and cards. Their detail pages also share almost the same structure. “Projects” currently feels like another case-study archive rather than a visual portfolio.

**Correction:** make Projects a concise visual gallery; make Case Studies evidence-led with problem, constraints, decisions, artefacts, and validation. Cross-link them without duplicating the whole presentation.

### P2 — Artwork is reused across unrelated contexts

The same web, SEO/growth, campaign, logo, and AI illustrations recur across homepage cards, service profiles, project galleries, and article cards. This weakens project authenticity and makes different disciplines feel interchangeable. Growth graphics containing values such as `+148%` can also look like claimed results when reused outside an explicitly illustrative project caption.

**Correction:** create project-specific interface sets and label every illustrative performance graphic adjacent to the image.

### P2 — Very long mobile pages need stronger navigation and density control

Measured at 390 px:

- Homepage: **20,538 px**
- Industries archive: **14,236 px**
- Services archive: **13,331 px**
- Project stories: approximately **10,282–10,510 px**

The layouts do not overflow, but they require prolonged scrolling through repeated modules.

**Correction:** add local section navigation/back-to-top, shorten repeated summaries, use progressive disclosure where appropriate, and reduce duplicate related/CTA content on small screens.

### P2 — Conversion closure is repetitive on some pages

The global footer CTA is consistent and should remain. However, pages such as Start Project and Blog place another substantial conversion section immediately before it, producing two adjacent invitations with similar messaging.

**Correction:** retain the footer CTA, but make the preceding block navigational/informational or remove the duplicate on those pages.

### P3 — Utility polish

No global back-to-top control or reading progress exists for long pages. Search/filter interfaces do not expose result counts or shareable filter state. These are not blockers, but would improve orientation.

## Page-by-page findings

### 1. `index.html` — Homepage — P2

- At 15,059 px desktop and 20,538 px mobile, the page is exceptionally long; thirteen major sections precede the final inquiry area.
- Service, industry, work, insight, and tool modules reuse artwork seen throughout inner pages, reducing homepage exclusivity.
- Section-level composition is polished, but there is no lightweight section index or back-to-top mechanism for the long mobile journey.
- Example partner brands and demo content remain placeholders for credible business evidence.

**Best next action:** reduce mobile repetition and create homepage-only featured visuals before adding more sections.

### 2. `about.html` — About — P2

- The abstract hero and abstract opening studio image do not immediately communicate people, place, or personality.
- Values and working-style sections are cleanly designed but generic; there are no team portraits, named disciplines, or concrete studio details to make the page distinctly ALIFY.
- The page relies on the global CTA for its close rather than a specific introduction to the team or working relationship.

### 3. `services.html` — Services archive — P1

- Six repeated media/text rows create a 3212 px primary archive section and a 13,331 px mobile page.
- There is no service comparison or guided chooser to help a visitor identify the right capability without reading all six rows.
- Related work is visually secondary and uses the same generic illustration library.

### 4. `service-single.html` — Legacy Web Development route — P3

- The canonical/meta refresh correctly targets `web-development.html`, so no separate visual redesign is needed.
- The file still contains a full duplicate page as fallback, which can drift visually and structurally from the canonical page.

**Correction:** keep only a lightweight accessible redirect fallback with a direct canonical link.

### 5. `web-development.html` — Web Development — P2

- A single generic responsive-site illustration carries most of the visual story; there is no real multi-breakpoint screen set, component system, performance view, or handover artefact.
- The delivery process is the same shared block used by all other services.
- Practical guidance is useful, but the page does not visually prove technical depth.

### 6. `ui-ux-design.html` — UI/UX Design — P2

- The page needs UX-specific evidence: user flow, wireframe-to-final comparison, prototype states, and usability findings.
- The current interface illustration and four-step artefact are too generic to distinguish this discipline strongly from Web Development.
- Shared process/related-capability modules preserve the same template rhythm as the other service pages.

### 7. `logo-design.html` — Logo Design — P2

- The identity mark illustration is reused, but there are no brand applications such as stationery, social avatar, signage, favicon, or responsive mark variants.
- No guideline-page or before/after identity artefact shows the breadth of a logo engagement.
- The service therefore reads as “one logo graphic” rather than a complete identity capability.

### 8. `digital-marketing.html` — Digital Marketing — P2

- Campaign artwork is not expanded into channel-specific examples such as paid social, email, landing page, and reporting views.
- Growth imagery can imply performance without an adjacent illustrative label.
- The process and closing related-capability sections repeat the standard service template.

### 9. `ai-automation.html` — AI Automation — P2

- Human control and fallback content is stronger than on most service pages.
- The main remaining gap is visual proof: no example automation map, exception queue, review state, or operational dashboard is shown.
- Dense workflow/control copy becomes a long stacked sequence on mobile; the shared service process still feels generic.

### 10. `seo.html` — SEO — P2

- The SEO page lacks tangible artefacts such as a technical audit excerpt, schema/content model, search-result preview, or measurement plan.
- Reused growth-chart artwork, including numerical uplift, needs explicit illustrative context.
- The shared process block and same service-page section sequence limit differentiation.

### 11. `industries.html` — Industries archive — P1

- Five large repeated photography/text rows create a 5092 px primary section and the site's longest inner mobile page at 14,236 px.
- There is no industry filter, comparison, or quick directory for direct navigation.
- Additional related work, principles, approach, and FAQs repeat content patterns already seen elsewhere, extending the page without adding enough visual contrast.

### 12. `industry-single.html` — SaaS & Technology — P2

- Office photography does not show SaaS-specific product complexity.
- No dashboard, onboarding flow, pricing-page example, feature hierarchy, or activation journey makes the sector expertise visible.
- The eight-section structure is shared almost exactly with every other industry profile.

### 13. `ecommerce.html` — E-commerce — P2

- The page lacks the expected storefront, category, product-detail, cart, checkout, and merchandising imagery.
- Current copy describes the journey, but visuals do not demonstrate commerce-specific thinking.
- Shared industry capability/engagement/FAQ modules dominate the second half.

### 14. `healthcare.html` — Healthcare — P2

- Photography and generic interface artwork do not show patient-facing information architecture or accessible service journeys.
- No appointment, provider discovery, sensitive-content, or accessibility example demonstrates healthcare-specific experience.
- The same industry template and section heights make it feel like a text substitution rather than a distinct sector profile.

### 15. `real-estate.html` — Real Estate — P2

- No property gallery, listing card, map/search experience, development brochure, or enquiry journey is visualised.
- The available imagery communicates generic workplace/consulting more than property.
- Practical copy is present, but the project and industry pages reuse the same broad claims without enough distinct artefacts.

### 16. `startups.html` — Startups — P2

- Startup imagery remains generic office/lifestyle photography.
- The page would benefit from an MVP scope map, launch roadmap, pitch narrative, or early-product interface rather than the standard industry module sequence.
- It shares the same long mobile rhythm and related-industry treatment as the other profiles.

### 17. `projects.html` — Projects archive — P2

- Filtering works, but the archive overlaps heavily with Case Studies in destinations, thumbnails, and card logic.
- Project imagery is recycled from service/blog artwork rather than presenting a distinctive portfolio gallery.
- A visual portfolio should prioritise larger, more varied project imagery and shorter supporting copy.

### 18. `project-single.html` — Fintech project — P2

- At 7911 px desktop and 10,474 px mobile, the page is thorough but follows the same project template as every other story.
- Fintech-specific dashboards, transaction states, data visualisation, security/trust patterns, and complex product screens are absent.
- Generic web/SEO illustrations do not substantiate the fintech concept.

### 19. `commerce-project.html` — Commerce project — P2

- The gallery does not focus on the core shopping journey: product discovery, variant selection, cart, checkout, and post-purchase states.
- Web design, growth, and AI artwork makes the story feel like a general marketing-site concept.
- Deliverables and timeline are clear, but their presentation is almost identical to the other projects.

### 20. `identity-project.html` — Identity project — P2

- Needs an actual identity board: logo variants, typography, palette, grid, iconography, voice, and real-world applications.
- Website/SEO/campaign images dilute the brand-identity focus.
- The project would benefit more from a full-bleed brand system sequence than the standard challenge/response module set.

### 21. `property-project.html` — Property project — P2

- No property-specific screens show listings, galleries, location context, availability, or enquiry flows.
- Generic web, search/growth, and campaign illustrations do not visually support the property story.
- Reversed artefact columns provide layout variation, not a distinct project narrative.

### 22. `wellness-project.html` — Wellness project — P2

- Missing wellness-specific service discovery, practitioner/content cards, appointment or programme flows, and accessible reassurance states.
- The same generic growth/campaign artwork appears instead of a calm, tailored product system.
- At 10,510 px on mobile, the repeated story structure becomes particularly lengthy.

### 23. `case-studies.html` — Case Studies archive — P1

- The archive duplicates the Projects destination set and too much of its visual language.
- Cards do not provide an evidence-led comparison of challenge, intervention, artefact, and proposed validation.
- The featured automation story is stronger than the rest, but the archive still feels like a second project grid.

### 24. `case-study-single.html` — Automation case study — P2

- Before/after workflows and human-control matrices are useful and more distinctive than the other project pages.
- The remaining gap is an actual product view: queue, approval, exception, audit trail, and integration states.
- It still inherits the same overview/challenge/response/artefacts/validation/next-project skeleton and a 10,282 px mobile journey.

### 25. `blog.html` — Blog archive — P2

- Combined search/filter works, but there is no visible result count, one-click clear/reset, or URL-persisted search/category state.
- The featured story plus five archive cards leaves an unbalanced final desktop row; a more intentional editorial layout could use this space better.
- Article artwork repeats the same site-wide illustration library.
- The pre-footer conversion strip and global footer CTA create adjacent competing CTA blocks.

### 26. `blog-single.html` — Clarity article — P2

- The 1201 px intro section delays the start of the article body.
- Desktop reading uses a narrow body beside a sticky TOC, leaving substantial unused horizontal space in the long middle of the page.
- Diagram, pull quote, related posts, and pagination improve navigation, but the overall composition remains shared with every other article.

### 27. `identity-that-works.html` — Identity article — P2

- The article body alone is 4141 px high at desktop; alternating the TOC/content side creates a large empty column rather than a richer editorial composition.
- The narrow blue pull quote and takeaway panel become visually tall relative to their content.
- More identity examples inside the body would be more valuable than the current amount of empty space.

### 28. `planning-scalable-website.html` — Website planning article — P2

- This is the longest article at 9320 px desktop, with a 4403 px body section.
- No reading progress or compact mobile chapter navigation supports the long read.
- Planning content needs a downloadable/visual sitemap, checklist, or content-model worksheet to break up the text-heavy body.

### 29. `technical-seo-experience.html` — Technical SEO article — P2

- The 4403 px body and 9110 px page have the same long-read orientation issue.
- Technical content would benefit from annotated audit snippets, waterfall/crawl diagrams, or before/after structured-data examples.
- Current diagrams improve appearance but do not provide enough technical evidence.

### 30. `campaign-next-decision.html` — Campaign article — P2

- The 1249 px introduction is the tallest article intro before the reading body.
- No concrete campaign journey, creative variant, channel plan, or measurement example accompanies the advice.
- It repeats the standard article hero/intro/body/pagination/related composition.

### 31. `useful-automation.html` — Automation article — P2

- The content explains principles clearly but lacks a concrete worked example with sample inputs, decision rules, review state, and fallback.
- The standard article composition and reused AI artwork make it visually similar to the automation service and case-study pages.
- A single detailed workflow would add more value than additional generic related content.

### 32. `contact.html` — Contact — P1

- The primary functional gap remains mailto-only delivery; there is no reliable on-site submission confirmation.
- Direct contact context is thin: no response-time expectation near the form, availability/timezone, location, or alternative professional contact channel.
- Native field validation is present, but there is no designed error summary/inline error system.
- The visual form and review dialog are polished; the main issue is completion confidence rather than styling.

### 33. `start-project.html` — Start Project — P1

- Mailto-only delivery means a detailed project brief can be lost if the visitor has no configured email client.
- The longer form has no save-and-resume, attachment route, progress indication, or post-submit confirmation state.
- The “smaller conversation” panel followed by the global footer CTA creates duplicate closing conversion blocks.
- Review-before-email is good, but it does not replace reliable submission UX.

### 34. `pricing.html` — Pricing — P1

- The page does not show actual prices, ranges, starting points, currencies, example scopes, or budget guidance; “Custom quote,” “Monthly scope,” and “Tailored engagement” are engagement labels, not pricing.
- There is no example package comparison tied to deliverable quantity, duration, or team allocation.
- Add-ons, exclusions, payment rhythm, and what changes a quote are only partially covered.

**Best next action:** add honest starting ranges or representative example budgets if the business can approve them; otherwise rename the page to Engagement Models.

### 35. `testimonials.html` — Testimonials — P1

- Every quote is explicitly demo content, so the page cannot yet provide social proof.
- The dedicated page uses a static featured quote and grid; it does not use the supplied centre-active blurred-side-card slider retained on the homepage.
- No client logos, project links, attribution images, or verified outcomes support the quotes.

### 36. `faqs.html` — FAQs — P2

- Search and accordion behaviour are solid, but twelve questions are grouped into only three broad categories.
- There are no direct question links, clear-search control, result count, or contextual route from an answer to the relevant service/pricing page.
- The desktop content area is comparatively sparse against the large global hero/footer system.

### 37. `privacy-policy.html` — Privacy Policy — P2

- Layout and mobile readability are good, but the visible “general website template” warning makes the page look unfinished for production.
- Processors, retention periods, and actual configured data practices remain generic.
- Legal navigation works, but there is no active-section indicator while scrolling.

### 38. `cookie-policy.html` — Cookie Policy — P2

- The visible template-review warning is a production-readiness gap.
- There is no concrete cookie/storage inventory table with name, purpose, duration, and provider; only general categories and session-storage prose are shown.
- Browser instructions are described but not linked to specific browser help resources.

### 39. `terms-and-conditions.html` — Terms & Conditions — P2

- The same legal heading and visible template warning make this feel like a placeholder rather than final business terms.
- Legal entity, jurisdiction/governing law, registered details, and a dedicated terms contact route are not specified.
- Layout is readable, but active-section navigation and a downloadable/print-friendly treatment are absent.

## Recommended implementation order

1. **Resolve purpose-level gaps:** Pricing, Testimonials, Contact, and Start Project.
2. **Separate Projects from Case Studies** and create project-specific interface artwork for all six stories.
3. **Differentiate the six service and five industry profiles** with genuine artefacts and varied editorial modules.
4. **Reduce mobile archive length** on Homepage, Services, and Industries.
5. **Improve article information design** and Blog filter orientation.
6. **Finalise legal/business content** and add utility polish.

This audit intentionally does not count external backend/CRM and approved client content as CSS defects; they are included only where they materially affect the page's user experience or credibility.
