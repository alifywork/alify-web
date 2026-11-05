"use strict";

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized === "true") return;
    this.dataset.initialized = "true";

    this.innerHTML = `
      <header class="site-header">
        <div class="header__shell container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="header__inner">
                <a class="header__logo" href="index.html" aria-label="Alify home">
                  <img class="header__logo--light" src="assets/images/logo/light-logo.png" alt="Alify" width="469" height="125">
                  <img class="header__logo--sticky" src="assets/images/logo/sticky-logo.png" alt="" width="469" height="125">
                </a>

                <nav class="header__nav" aria-label="Primary navigation">
                  <ul class="header__nav-list">
                    <li><a class="header__nav-link" href="index.html">Home</a></li>
                    <li><a class="header__nav-link" href="services.html">Services</a></li>
                    <li><a class="header__nav-link" href="projects.html">Work</a></li>
                    <li><a class="header__nav-link" href="about.html">About</a></li>
                    <li><a class="header__nav-link" href="contact.html">Contact</a></li>
                  </ul>
                </nav>

                <div class="header__actions">
                  <a class="header__cta" href="start-project.html">
                    Let's talk <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i>
                  </a>
                  <button class="header__drawer-toggle" type="button" aria-label="Open about Alify" aria-haspopup="dialog" aria-expanded="false" aria-controls="about-drawer">
                    <i class="fa-solid fa-grip-vertical" aria-hidden="true"></i>
                  </button>
                  <button class="header__menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-navigation">
                    <i class="fa-solid fa-bars" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <nav class="header__mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden>
                <ul class="header__mobile-list">
                  <li><a class="header__nav-link" href="index.html">Home</a></li>
                  <li><a class="header__nav-link" href="services.html">Services</a></li>
                  <li><a class="header__nav-link" href="projects.html">Work</a></li>
                  <li><a class="header__nav-link" href="about.html">About</a></li>
                  <li><a class="header__nav-link" href="contact.html">Contact</a></li>
                </ul>
                <a class="header__cta header__mobile-cta" href="start-project.html">Let's talk <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i></a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <dialog class="about-drawer" id="about-drawer" aria-labelledby="about-drawer-title">
        <div class="drawer__inner">
          <div class="drawer__top">
            <p class="drawer__label">About Alify</p>
            <button class="drawer__close" type="button" aria-label="Close about Alify">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>

          <div class="drawer__content" id="about">
            <p class="drawer__eyebrow">Independent digital studio</p>
            <h2 class="drawer__title" id="about-drawer-title">Ideas, designed to move people.</h2>
            <p class="drawer__copy">
              We blend strategy, thoughtful design, and creative technology to build distinctive digital experiences for ambitious brands.
            </p>
            <ul class="drawer__services" aria-label="Our expertise">
              <li>Strategy</li>
              <li>Brand identity</li>
              <li>Web design</li>
              <li>Development</li>
            </ul>
          </div>

          <a class="drawer__cta" href="start-project.html" data-drawer-close>
            Start a project <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i>
          </a>
        </div>
      </dialog>
    `;

    this.header = this.querySelector(".site-header");
    this.headerShell = this.querySelector(".header__shell");
    this.drawer = this.querySelector("#about-drawer");
    this.drawerToggle = this.querySelector(".header__drawer-toggle");
    this.menuToggle = this.querySelector(".header__menu-toggle");
    this.mobileNavigation = this.querySelector(".header__mobile-nav");
    this.setActiveNavigation();

    this.drawerToggle.addEventListener("click", () => this.openDrawer());
    this.querySelector(".drawer__close").addEventListener("click", () => this.drawer.close());
    this.querySelector("[data-drawer-close]").addEventListener("click", () => this.drawer.close());
    this.menuToggle.addEventListener("click", () => this.toggleMobileNavigation());

    this.drawer.addEventListener("click", (event) => {
      if (event.target === this.drawer) this.drawer.close();
    });

    this.drawer.addEventListener("close", () => {
      this.drawerToggle.setAttribute("aria-expanded", "false");
    });

    this.querySelectorAll(".header__mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => this.closeMobileNavigation());
    });

    this.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.mobileNavigation.hidden) {
        this.closeMobileNavigation();
        this.menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1100) this.closeMobileNavigation();
    });

    let scrollFrame = null;
    window.addEventListener("scroll", () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(() => {
        this.updateStickyHeader();
        scrollFrame = null;
      });
    }, { passive: true });

    this.updateStickyHeader();
  }

  updateStickyHeader() {
    // Hysteresis prevents rapid state changes around the scroll threshold.
    const isSticky = this.header.classList.contains("is-sticky")
      ? window.scrollY > 24
      : window.scrollY > 48;
    this.header.classList.toggle("is-sticky", isSticky);
    this.headerShell.classList.toggle("container", isSticky);
    this.headerShell.classList.toggle("container-fluid", !isSticky);
  }

  setActiveNavigation() {
    const pageGroups = {
      "service-single.html": "services.html",
      "project-single.html": "projects.html"
    };
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const activeFile = pageGroups[currentFile] || currentFile;

    this.querySelectorAll(".header__nav-link").forEach((link) => {
      const linkFile = new URL(link.href, window.location.href).pathname.split("/").pop() || "index.html";
      if (linkFile === activeFile) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  openDrawer() {
    this.closeMobileNavigation();
    this.drawerToggle.setAttribute("aria-expanded", "true");
    this.drawer.showModal();
  }

  toggleMobileNavigation() {
    const willOpen = this.mobileNavigation.hidden;
    this.mobileNavigation.hidden = !willOpen;
    this.menuToggle.setAttribute("aria-expanded", String(willOpen));
    this.menuToggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    this.menuToggle.querySelector("i").className = willOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }

  closeMobileNavigation() {
    this.mobileNavigation.hidden = true;
    this.menuToggle.setAttribute("aria-expanded", "false");
    this.menuToggle.setAttribute("aria-label", "Open navigation");
    this.menuToggle.querySelector("i").className = "fa-solid fa-bars";
  }
}

if (!customElements.get("site-header")) {
  customElements.define("site-header", SiteHeader);
}
