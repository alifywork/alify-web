# ALIFY — Current UI Gaps and Missing Sections

Date: 2026-11-06
Scope: current 39-page build after the technical QA and editorial rebuilds.

## How to read this audit

- **P1 — Correct:** broken, misleading, or mismatched user journey.
- **P2 — Add:** meaningful supporting content or functionality that would make the page more complete.
- **P3 — Polish:** visual variety or enhancement; the current page remains usable.
- **External:** requires business content, legal approval, client proof, or backend configuration.

The previous technical QA still stands: no known horizontal overflow, broken local assets, JavaScript errors, duplicate IDs, or tested WCAG A/AA violations. This document is a deeper content, navigation, and page-completeness inventory—not a list of confirmed rendering bugs on every page.

## Global findings

| Priority | Area | Current gap |
| --- | --- | --- |
| P1 | Homepage Selected Work | “Commerce without friction” and “Intelligence at work” still open `project-single.html`, so the destination does not match the selected card. |
| P1 | Homepage Latest Insights | All three cards link to Case Studies rather than a matching Blog article; two displayed article topics do not yet have matching posts. |
| P2 | Desktop and mobile navigation | Blog, Case Studies, Industries, Pricing, Testimonials, and FAQs are mainly footer destinations. Their discoverability is limited in the primary/mobile navigation. |
| P3 | Hero art direction | The supplied abstract hero family is used across most pages. It is consistent, but additional page-specific compositions would reduce visual sameness. |
| P3 | Repeated template families | Six service profiles, five industry profiles, six project stories, and six articles each reuse one composition. Content differs, but section choreography is predictable across each family. |
| External | Forms | Contact and Start Project still prepare `mailto:` messages rather than submitting to a verified server or CRM. |
| External | Proof content | Projects remain concepts and testimonials remain demo content until approved client evidence is supplied. |

## Page-by-page inventory

### Homepage and core studio pages

| Page | Current UI/content gap | Missing or recommended sections | Priority |
| --- | --- | --- | --- |
| `index.html` | Two Selected Work cards have mismatched destinations. Latest Insights does not lead to matching articles. Work/insight imagery is still more abstract than the newer inner-page artwork. | Correct card mappings; add matching articles for the displayed brief/accessibility topics or change the cards to existing posts; add a clear “View all insights” link. | **P1**, P3 |
| `about.html` | Studio story, principles, process, and culture are present, but the people behind the studio remain abstract. | Team/founder profiles, studio timeline or milestones, working-location/time-zone information, and approved client/partner proof. | P2 |
| `services.html` | Capabilities, engagement models, process, tools, and FAQs are complete; the page does not connect those capabilities to evidence. | Selected work by capability, a pricing/engagement-guide link, and a short “which service fits my brief?” decision guide. | P2 |
| `projects.html` | Archive and dedicated mappings are complete. Repetition is limited to the shared animated-art format. | Optional sector filters, project deliverable tags, and a clearer distinction between visual projects and detailed case studies. | P3 |
| `case-studies.html` | Featured story, filters, archive, and measurement principles are present. No critical section is missing. | Optional industry filters and verified outcome summaries when real client data becomes available. | P3 / External |
| `pricing.html` | Models, comparison, inclusions, and FAQs are present; the route from interest to proposal is not explained visually. | Proposal steps, main cost factors, example scope compositions, and optional indicative ranges only if commercially approved. | P2 |
| `testimonials.html` | Quote layouts are complete, but demo quotes do not lead to supporting work or evidence. | Verified client attribution, client logos/photos if approved, and a related case-study link beside each real quote. | External / P2 |
| `faqs.html` | Search, filters, accordions, and 12 answers work. The archive ends without a contextual escalation route beyond the global footer. | “Still need help?” contact panel, popular-question shortcuts, and optional links to relevant service/process guides. | P2 |

### Individual service pages

All six pages currently include overview, animated showcase, outcomes, deliverables, process, related services, and FAQs. Their common gap is a lack of service-specific proof and buying guidance.

| Page | Missing or recommended sections | Priority |
| --- | --- | --- |
| `web-development.html` | Relevant website case study, sample technical stack/architecture, typical timeline factors, and maintenance/handover details. | P2 |
| `seo.html` | Sample SEO workflow/audit artefact, measurement framework, relevant growth case study, and realistic expectation-setting around results. | P2 |
| `digital-marketing.html` | Campaign journey example, channel/creative matrix, measurement plan, and relevant commerce/growth story. | P2 |
| `ai-automation.html` | Before/after workflow diagram, human-controls and exception-handling matrix, integration examples, and automation case-study link. | P2 |
| `ui-ux-design.html` | Research-to-wireframe-to-UI artefact gallery, usability-validation approach, design-system example, and product case-study link. | P2 |
| `logo-design.html` | Logo variations, responsive/small-size tests, brand-application gallery, guideline deliverables, and identity case-study link. | P2 |
| `service-single.html` | No missing UI; this is a legacy redirect to `web-development.html`. | None |

### Industry archive and profiles

| Page | Current UI/content gap | Missing or recommended sections | Priority |
| --- | --- | --- | --- |
| `industries.html` | Directory, shared principles, approach, and FAQs are present; industries are not connected to relevant work. | Featured sector case studies and relevant journal insights. | P2 |
| `industry-single.html` — SaaS | Strong sector narrative, but no product-evaluation artefact or relevant proof. | SaaS evaluation-journey example, product/marketing-system gallery, integrations, and fintech case-study link. | P2 |
| `ecommerce.html` | Commerce capabilities are clear; platform and operational considerations are light. | Platform/integration examples, discovery-to-checkout journey, merchandising/content checklist, and commerce case-study link. | P2 |
| `real-estate.html` | Property storytelling is covered; inventory and listing operations are not shown. | Listing/search/inquiry journey, property-data integration considerations, gallery/plans example, and property case-study link. | P2 |
| `healthcare.html` | Accessibility and privacy principles are stated without a concrete artefact. | Accessible content example, patient-journey map, privacy-conscious form guidance, review responsibilities, and wellness case-study link. | P2 |
| `startups.html` | Launch capabilities are present; phasing and prioritisation could be more actionable. | Phase-one/phase-two roadmap, MVP scope example, launch checklist, and relevant identity/product stories. | P2 |

### Dedicated project and case-study stories

Every story currently includes overview, challenge, response, experience direction, proposed measures, and a next-project link. The layouts work, but the shared template and two-scene artwork limit the depth of the case presentation.

| Page | Missing or recommended sections | Priority |
| --- | --- | --- |
| `project-single.html` — Fintech | Product-screen gallery, responsive states, content-hierarchy before/after, deliverables, and illustrative timeline. | P2 / P3 |
| `commerce-project.html` | Discovery/product/checkout journey, product-card and reassurance patterns, campaign-to-storefront flow, and deliverables. | P2 / P3 |
| `identity-project.html` | Logo suite, colour/type specimens, small-size tests, brand applications, and guideline contents. | P2 / P3 |
| `property-project.html` | Listing/search/detail/inquiry screens, property-plan/gallery treatment, content model, and deliverables. | P2 / P3 |
| `wellness-project.html` | Accessibility annotations, service-content journey, appointment/inquiry flow, and privacy considerations. | P2 / P3 |
| `case-study-single.html` — Automation | Current-state/future-state workflow map, exception/control matrix, implementation phases, and validation dashboard concept. | P2 |

### Contact and project inquiry

| Page | Current UI/content gap | Missing or recommended sections | Priority |
| --- | --- | --- | --- |
| `contact.html` | Form, process, and FAQs work. Direct email is present, but availability and privacy expectations are limited. | Response-time/availability guidance once approved, privacy-policy link near submission, and optional location/time-zone details. | P2 |
| `start-project.html` | Detailed brief form works through email preparation; there is no review/consent step or direct upload. | Privacy acknowledgement, brief-review summary before opening email, budget/timeline guidance, and attachment support only with a real backend. | P2 / External |

### Blog archive and articles

| Page | Current UI/content gap | Missing or recommended sections | Priority |
| --- | --- | --- | --- |
| `blog.html` | Featured post, filters, and editorial principles are present. There is no article search or author/date context. | Article search, author/publication metadata, and pagination or load-more only when the collection grows. | P2 |
| `blog-single.html` — Clarity/conversion | Readable long-form layout is complete; only the cover provides visual explanation. The shared pull quote is repeated across articles. | Author/date, unique pull quote, before/after hierarchy visual, contextual related posts, and previous/next navigation. | P2 / P3 |
| `planning-scalable-website.html` | Same article-level metadata and navigation gaps. | Content-model diagram, website-planning checklist, reusable-component example, author/date, and previous/next links. | P2 / P3 |
| `useful-automation.html` | Same article-level metadata and navigation gaps. | Trigger-to-outcome workflow map, human-control example, downloadable discovery checklist, and unique pull quote. | P2 / P3 |
| `technical-seo-experience.html` | Same article-level metadata and navigation gaps. | Technical SEO checklist, internal-linking diagram, performance-budget example, and unique pull quote. | P2 / P3 |
| `campaign-next-decision.html` | Same article-level metadata and navigation gaps. | Campaign-to-landing journey diagram, measurement example, creative/destination checklist, and unique pull quote. | P2 / P3 |
| `identity-that-works.html` | Same article-level metadata and navigation gaps. | Identity touchpoint grid, small-size logo test, brand-system example, and unique pull quote. | P2 / P3 |

### Legal pages

| Page | Current status | Missing or recommended action | Priority |
| --- | --- | --- | --- |
| `privacy-policy.html` | On-page navigation, six topics, contact information, and last-updated date are present. No UI section is missing. | Final legal review against actual business operations and enabled providers. | External |
| `terms-and-conditions.html` | On-page navigation, six topics, concept disclaimers, and last-updated date are present. No UI section is missing. | Final legal review and alignment with actual proposals/contracts. | External |
| `cookie-policy.html` | On-page navigation, current storage disclosure, choices, and last-updated date are present. No UI section is missing. | Revalidate if analytics, embeds, advertising, or consent tools are introduced. | External |

## Recommended implementation order

1. **P1:** Correct homepage Selected Work destinations and rebuild Latest Insights around genuine Blog URLs.
2. **P2 navigation:** Add a usable secondary navigation route for Blog, Case Studies, Industries, Pricing, Testimonials, and FAQs.
3. **P2 evidence:** Add related-work links and service/industry-specific artefacts rather than more generic CTA sections.
4. **P2 articles/projects:** Add practical diagrams, galleries, checklists, author/date metadata, and contextual previous/next navigation.
5. **P3 visual variety:** Vary section choreography inside repeated page families while retaining the global design system.
6. **External:** Connect form delivery and replace concept/demo proof only when verified inputs are available.
