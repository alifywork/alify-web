# ALIFY launch checklist

## Deploy

- [ ] Review and merge PR #1 into the production branch; the Arena working branch itself is not the live deployment.
- [ ] Use Node.js 20 or newer and run `npm ci`, then `npm start` behind the production process manager.
- [ ] Configure HTTPS and confirm the public origin is `https://alify.com`; if the final domain differs, update canonical URLs, Open Graph URLs, structured data, `robots.txt`, and `sitemap.xml` together.
- [ ] Attach a persistent server disk for `storage/inquiries/` and `storage/exports/`; ephemeral hosting alone is not suitable for inquiry storage.
- [ ] Restrict storage permissions and configure protected, regularly tested backups. Never expose storage through the web server.
- [ ] Keep `.env` and SMTP credentials out of Git. Use the hosting provider's secret environment settings based on `.env.example`.

## Content required before public launch

- [ ] Replace explicitly labelled demo testimonials with verified client reviews and replace Google Reviews placeholder links with real URLs.
- [ ] Replace social-profile `#` placeholders with real LinkedIn, Instagram, and Behance URLs.
- [ ] Confirm concept-project wording is acceptable or replace it with approved client work, imagery, outcomes, and permissions.
- [ ] Confirm the team approves indicative USD pricing and current service/contact copy.
- [ ] Verify `hello@alify.com` is monitored by the team.

## Production verification

- [ ] Submit Home, Contact, and Start Project inquiries and save their references; confirm records persist after an application restart.
- [ ] Test one real attachment and then securely remove test inquiries/files.
- [ ] If SMTP is enabled, verify notification delivery and configure SPF, DKIM, and DMARC with the mail provider. Saved inquiries remain authoritative if email fails.
- [ ] Run `npm run inquiries:export` on the server and confirm the CSV is private and access-controlled.
- [ ] Check `/robots.txt`, `/sitemap.xml`, social-sharing previews, favicon, mobile navigation, filters, sliders, lightbox, and a nested unknown URL returning the branded 404.
- [ ] Submit `https://alify.com/sitemap.xml` in Google Search Console and monitor indexing/crawl reports.
- [ ] Review browser console, server logs, backup restores, and inquiry volume after launch.

## Verified in the Arena branch

- Metadata, JSON-LD, sitemap targets, and internal links/assets audit.
- 44 HTML files at five viewport widths: 220 loads with no tested overflow, JavaScript errors, or failed responses.
- Targeted Axe and mobile target-size checks.
- Home, Contact, and Start Project submission flows, review dialogs, attachment persistence, and synthetic-record cleanup.
- Industry autoplay/pause, testimonial controls, FAQ/Blog filters, project lightbox, and mobile navigation.
- SMTP success and outage persistence using a local fake SMTP server; no external test email was sent.
