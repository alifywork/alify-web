"use strict";

class PageHero extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized === "true") return;
    this.dataset.initialized = "true";

    const eyebrow = this.getAttribute("eyebrow") || "Alify";
    const title = this.getAttribute("title") || "Digital experiences with purpose.";
    const description = this.getAttribute("description") || "";
    const requestedBackground = this.getAttribute("background") || "neon-lines-01.webp";
    const background = /^neon-lines-(?:0[1-9]|1[0-4])\.webp$/.test(requestedBackground)
      ? requestedBackground
      : "neon-lines-01.webp";

    this.innerHTML = `
      <main class="page-hero" id="home">
        <div class="page-hero__media" aria-hidden="true">
          <img src="assets/images/background/${background}" alt="" width="1920" height="1080" fetchpriority="high">
        </div>
        <div class="container page-hero__container">
          <div class="row">
            <div class="col-12">
              <section class="page-hero__content" aria-labelledby="page-hero-title">
                <p class="page-hero__eyebrow">${this.escapeHTML(eyebrow)}</p>
                <h1 class="page-hero__title" id="page-hero-title">${this.escapeHTML(title)}</h1>
                <p class="page-hero__description">${this.escapeHTML(description)}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
    `;

    this.animateHero();
  }

  escapeHTML(value) {
    return value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[character]);
  }

  animateHero() {
    if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap } = window;
    const content = this.querySelectorAll(".page-hero__content > *");
    const image = this.querySelector(".page-hero__media img");

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(image, { scale: 1.08, autoAlpha: 0, duration: 1.2 })
      .from(content, { y: 36, autoAlpha: 0, duration: 0.75, stagger: 0.1 }, "-=0.75");

    if (window.ScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger);
      gsap.to(image, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: this.querySelector(".page-hero"),
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }
}

if (!customElements.get("page-hero")) {
  customElements.define("page-hero", PageHero);
}
