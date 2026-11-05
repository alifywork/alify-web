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
                      <li><a class="footer__nav-link" href="#services">Services</a></li>
                      <li><a class="footer__nav-link" href="#work">Work</a></li>
                      <li><a class="footer__nav-link" href="#about" data-open-about>About</a></li>
                    </ul>
                  </nav>

                  <ul class="footer__social-list" aria-label="Footer utilities">
                    <li><a class="footer__social-link" href="#home">Back to top <i class="fa-solid fa-arrow-up" aria-hidden="true"></i></a></li>
                  </ul>

                  <p class="footer__legal">© <span data-current-year></span> Alify. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;

    this.querySelector("[data-current-year]").textContent = new Date().getFullYear();
    this.querySelector("[data-open-about]").addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("site-header")?.openDrawer();
    });
  }
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}
