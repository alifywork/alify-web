"use strict";

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized === "true") return;
    this.dataset.initialized = "true";

    this.innerHTML = `
      <footer class="site-footer" id="contact">
        <section class="footer-cta" aria-labelledby="footer-cta-title">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="footer-cta__inner">
                  <p class="footer-cta__eyebrow">Have a project in mind?</p>
                  <h2 id="footer-cta-title">Let’s make something great together.</h2>
                  <p class="footer-cta__copy">Share the challenge, the rough idea, or the next big move. We’re ready to hear what you’re planning.</p>
                  <a class="footer-cta__link" href="contact.html">
                    Let’s talk <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="footer__main">
          <div class="container">
            <div class="row footer__grid">
              <div class="col-12 col-lg-4">
                <div class="footer__brand">
                  <a class="footer__logo" href="index.html" aria-label="Alify home">
                    <img src="assets/images/logo/light-logo.png" alt="Alify" width="469" height="125" loading="lazy" decoding="async">
                  </a>
                  <p>Worldwide digital agency bringing development, design, content, marketing, and AI automation together for ambitious brands.</p>
                  <a class="footer__brand-email" href="mailto:hello@alify.com">hello@alify.com <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i></a>
                  <div class="social-links" aria-label="ALIFY social media"><a href="#" aria-label="ALIFY on LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a><a href="#" aria-label="ALIFY on Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a><a href="#" aria-label="ALIFY on Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a><a href="#" aria-label="ALIFY on X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a><a href="#" aria-label="ALIFY on Behance"><i class="fa-brands fa-behance" aria-hidden="true"></i></a></div>
                </div>
              </div>

              <div class="col-6 col-lg-2">
                <nav class="footer__column" aria-label="Footer navigation">
                  <h3>Explore</h3>
                  <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="projects.html">Work</a></li>
                    <li><a href="case-studies.html">Case Studies</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="industries.html">Industries</a></li>
                    <li><a href="pricing.html">Pricing</a></li>
                  </ul>
                </nav>
              </div>

              <div class="col-6 col-lg-3">
                <nav class="footer__column" aria-label="Footer services">
                  <h3>Services</h3>
                  <ul>
                    <li><a href="web-development.html">Web Development</a></li><li><a href="wordpress-development.html">WordPress</a></li><li><a href="shopify-development.html">Shopify</a></li>
                    <li><a href="seo.html">SEO</a></li>
                    <li><a href="digital-marketing.html">Digital Marketing</a></li>
                    <li><a href="ai-automation.html">AI Automation</a></li>
                    <li><a href="ui-ux-design.html">UI UX Design</a></li>
                    <li><a href="logo-design.html">Logo Design</a></li><li><a href="content-writing.html">Content Writing</a></li><li><a href="graphic-design.html">Graphic Design</a></li>
                  </ul>
                </nav>
              </div>

              <div class="col-12 col-lg-3">
                <div class="footer__column footer__contact-card">
                  <h3>Start a conversation</h3>
                  <p>Have a question before starting a project? Send us a note and let’s talk through it.</p>
                  <a class="footer__contact-page" href="contact.html">Visit the contact page <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>

            <div class="row footer__bottom-row">
              <div class="col-12">
                <div class="footer__bottom">
                  <p>© <span data-current-year></span> Alify. All rights reserved.</p>
                  <nav class="footer__legal-links" aria-label="Legal navigation">
                    <a href="privacy-policy.html">Privacy Policy</a>
                    <a href="terms-and-conditions.html">Terms &amp; Conditions</a>
                    <a href="cookie-policy.html">Cookie Policy</a>
                  </nav>
                  <a class="footer__back-top" data-footer-back-top href="#main-content">Back to top <i class="fa-solid fa-arrow-up" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;

    this.querySelector("[data-current-year]").textContent = new Date().getFullYear();
    if (document.querySelector("#home")) this.querySelector("[data-footer-back-top]").href = "#home";
  }
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}
