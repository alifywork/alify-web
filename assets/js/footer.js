"use strict";

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized === "true") return;
    this.dataset.initialized = "true";

    this.innerHTML = `
      <footer class="site-footer" id="contact">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="footer__inner">
                <div class="footer__contact">
                  <div>
                    <p class="footer__eyebrow">Have a project in mind?</p>
                    <h2 class="footer__title">Let's make it <span>real.</span></h2>
                  </div>
                  <a class="footer__contact-link" href="mailto:hello@alify.com" aria-label="Email Alify">
                    <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i>
                  </a>
                </div>

                <div class="footer__bottom">
                  <a class="footer__logo" href="index.html" aria-label="Alify home">
                    <img src="assets/images/logo/light-logo.png" alt="Alify" width="469" height="125" loading="lazy" decoding="async">
                  </a>

                  <nav aria-label="Footer navigation">
                    <ul class="footer__nav-list">
                      <li><a class="footer__nav-link" href="index.html">Home</a></li>
                      <li><a class="footer__nav-link" href="services.html">Services</a></li>
                      <li><a class="footer__nav-link" href="projects.html">Work</a></li>
                      <li><a class="footer__nav-link" href="about.html">About</a></li>
                      <li><a class="footer__nav-link" href="case-studies.html">Case Studies</a></li>
                      <li><a class="footer__nav-link" href="pricing.html">Pricing</a></li>
                    </ul>
                  </nav>

                  <ul class="footer__social-list" aria-label="Footer utilities">
                    <li><a class="footer__social-link" href="#home">Back to top <i class="fa-solid fa-arrow-up" aria-hidden="true"></i></a></li>
                  </ul>

                  <div class="footer__legal">
                    <p>© <span data-current-year></span> Alify. All rights reserved.</p>
                    <nav class="footer__legal-links" aria-label="Legal navigation">
                      <a href="privacy-policy.html">Privacy Policy</a>
                      <a href="terms-and-conditions.html">Terms & Conditions</a>
                      <a href="cookie-policy.html">Cookie Policy</a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;

    this.querySelector("[data-current-year]").textContent = new Date().getFullYear();
  }
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}
