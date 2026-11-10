"use strict";

const alifyServices = [
  { title: "Web Development", slug: "web-development", icon: "fa-code", description: "Fast, scalable digital experiences." },
  { title: "WordPress Development", slug: "wordpress-development", icon: "fa-brands fa-wordpress", description: "Flexible, manageable publishing platforms." },
  { title: "Shopify Development", slug: "shopify-development", icon: "fa-brands fa-shopify", description: "Commerce built to convert and grow." },
  { title: "SEO", slug: "seo", icon: "fa-magnifying-glass", description: "Grow visibility and organic reach." },
  { title: "Digital Marketing", slug: "digital-marketing", icon: "fa-bullhorn", description: "Campaigns that create momentum." },
  { title: "AI Automation", slug: "ai-automation", icon: "fa-robot", description: "Smarter systems and workflows." },
  { title: "UI UX Design", slug: "ui-ux-design", icon: "fa-pen-ruler", description: "Intuitive, human-centered products." },
  { title: "Logo Design", slug: "logo-design", icon: "fa-pen-nib", description: "Distinctive marks for ambitious brands." },
  { title: "Content Writing", slug: "content-writing", icon: "fa-file-pen", description: "Clear stories for people and search." },
  { title: "Graphic Design", slug: "graphic-design", icon: "fa-shapes", description: "Campaign and communication design." }
];

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized === "true") return;
    this.dataset.initialized = "true";

    const serviceLinks = alifyServices.map((service) => `
      <a class="mega-menu__link" href="${service.slug}.html">
        <span class="mega-menu__icon" aria-hidden="true"><i class="${service.icon.startsWith("fa-brands") ? service.icon : `fa-solid ${service.icon}`}"></i></span>
        <span class="mega-menu__copy">
          <strong>${service.title}</strong>
          <small>${service.description}</small>
        </span>
      </a>
    `).join("");

    const mobileServiceLinks = alifyServices.map((service) => `
      <a href="${service.slug}.html">
        <i class="${service.icon.startsWith("fa-brands") ? service.icon : `fa-solid ${service.icon}`}" aria-hidden="true"></i>
        <span>${service.title}</span>
      </a>
    `).join("");

    const resourceLinks = [
      ["blog.html", "Blog", "Ideas and practical perspectives", "fa-newspaper"],
      ["case-studies.html", "Case Studies", "Challenges, responses, and measures", "fa-diagram-project"],
      ["industries.html", "Industries", "Digital thinking for different sectors", "fa-building"],
      ["pricing.html", "Pricing", "Flexible engagement models", "fa-tags"],
      ["testimonials.html", "Testimonials", "Partnership perspectives", "fa-comments"],
      ["faqs.html", "FAQs", "Answers before we begin", "fa-circle-question"]
    ];
    const desktopResourceLinks = resourceLinks.map(([url, title, description, icon]) => `
      <a class="mega-menu__link" href="${url}"><span class="mega-menu__icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span><span class="mega-menu__copy"><strong>${title}</strong><small>${description}</small></span></a>
    `).join("");
    const mobileResourceLinks = resourceLinks.map(([url, title, description, icon]) => `<a href="${url}"><i class="fa-solid ${icon}" aria-hidden="true"></i><span>${title}</span></a>`).join("");

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
                    <li class="header__mega-item">
                      <div class="header__mega-trigger">
                        <a class="header__nav-link" href="services.html">Services</a>
                        <button class="header__mega-toggle" type="button" aria-label="Open services menu" aria-expanded="false" aria-controls="services-mega-menu">
                          <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                        </button>
                      </div>
                      <div class="mega-menu" id="services-mega-menu" aria-label="Services menu" aria-hidden="true" inert>
                        <div class="mega-menu__header">
                          <div>
                            <span class="mega-menu__eyebrow">What we do</span>
                            <h2>Capabilities built around your goals.</h2>
                          </div>
                          <a href="services.html">View all services <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i></a>
                        </div>
                        <div class="mega-menu__grid">${serviceLinks}</div>
                      </div>
                    </li>
                    <li><a class="header__nav-link" href="projects.html">Work</a></li>
                    <li class="header__mega-item header__resources-item">
                      <div class="header__mega-trigger">
                        <a class="header__nav-link" href="blog.html">Explore</a>
                        <button class="header__mega-toggle header__resources-toggle" type="button" aria-label="Open resources menu" aria-expanded="false" aria-controls="resources-mega-menu"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
                      </div>
                      <div class="mega-menu" id="resources-mega-menu" aria-label="Resources menu" aria-hidden="true" inert>
                        <div class="mega-menu__header"><div><span class="mega-menu__eyebrow">Explore ALIFY</span><h2>More thinking, context, and answers.</h2></div></div>
                        <div class="mega-menu__grid">${desktopResourceLinks}</div>
                      </div>
                    </li>
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
                  <button class="header__menu-toggle" type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded="false" aria-controls="mobile-navigation">
                    <i class="fa-solid fa-bars" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <dialog class="navigation-drawer" id="mobile-navigation" aria-labelledby="navigation-drawer-title">
        <div class="navigation-drawer__inner">
          <div class="navigation-drawer__top">
            <img src="assets/images/logo/sticky-logo.png" alt="Alify" width="469" height="125">
            <button class="navigation-drawer__close" type="button" aria-label="Close navigation">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>
          <p class="navigation-drawer__label" id="navigation-drawer-title">Navigation</p>
          <nav aria-label="Mobile navigation">
            <ul class="header__mobile-list">
              <li><a class="header__nav-link" href="index.html">Home</a></li>
              <li class="header__mobile-mega">
                <div class="header__mobile-mega-trigger">
                  <a class="header__nav-link" href="services.html">Services</a>
                  <button class="header__mobile-mega-toggle" type="button" aria-label="Show services" aria-expanded="false" aria-controls="mobile-services-menu">
                    <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
                  </button>
                </div>
                <div class="header__mobile-services" id="mobile-services-menu" hidden>${mobileServiceLinks}</div>
              </li>
              <li><a class="header__nav-link" href="projects.html">Work</a></li>
              <li class="header__mobile-mega">
                <div class="header__mobile-mega-trigger"><a class="header__nav-link" href="blog.html">Explore</a><button class="header__mobile-mega-toggle header__mobile-resources-toggle" type="button" aria-label="Show resources" aria-expanded="false" aria-controls="mobile-resources-menu"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button></div>
                <div class="header__mobile-services" id="mobile-resources-menu" hidden>${mobileResourceLinks}</div>
              </li>
              <li><a class="header__nav-link" href="about.html">About</a></li>
              <li><a class="header__nav-link" href="contact.html">Contact</a></li>
            </ul>
            <a class="header__cta header__mobile-cta" href="start-project.html">Let's talk <i class="fa-solid fa-arrow-right icon-arrow-up-right" aria-hidden="true"></i></a>
          </nav>
          <p class="navigation-drawer__footer">Ideas, designed to move people.</p>
        </div>
      </dialog>

      <dialog class="about-drawer" id="about-drawer" aria-labelledby="about-drawer-title">
        <div class="drawer__inner">
          <div class="drawer__top">
            <p class="drawer__label">About Alify</p>
            <button class="drawer__close" type="button" aria-label="Close about Alify">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
          </div>

          <div class="drawer__content" id="about">
            <p class="drawer__eyebrow">Worldwide digital agency</p>
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

          <div class="social-links" aria-label="ALIFY social media">
            <a href="#" aria-label="ALIFY on LinkedIn"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
            <a href="#" aria-label="ALIFY on Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
            <a href="#" aria-label="ALIFY on Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
            <a href="#" aria-label="ALIFY on X"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>
            <a href="#" aria-label="ALIFY on Behance"><i class="fa-brands fa-behance" aria-hidden="true"></i></a>
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
    this.mobileNavigation = this.querySelector("#mobile-navigation");
    this.megaItem = this.querySelector(".header__mega-item");
    this.megaToggle = this.querySelector(".header__mega-toggle");
    this.megaMenu = this.querySelector(".mega-menu");
    this.mobileMegaToggle = this.querySelector(".header__mobile-mega-toggle");
    this.mobileServices = this.querySelector(".header__mobile-services");
    this.resourcesItem = this.querySelector(".header__resources-item");
    this.resourcesToggle = this.querySelector(".header__resources-toggle");
    this.resourcesMenu = this.querySelector("#resources-mega-menu");
    this.mobileResourcesToggle = this.querySelector(".header__mobile-resources-toggle");
    this.mobileResources = this.querySelector("#mobile-resources-menu");
    this.setActiveNavigation();

    this.drawerToggle.addEventListener("click", () => this.openDrawer());
    this.querySelector(".drawer__close").addEventListener("click", () => this.drawer.close());
    this.querySelector("[data-drawer-close]").addEventListener("click", () => this.drawer.close());
    this.menuToggle.addEventListener("click", () => this.toggleMobileNavigation());
    this.querySelector(".navigation-drawer__close").addEventListener("click", () => this.closeMobileNavigation());
    this.megaToggle.addEventListener("click", () => this.toggleMegaMenu());
    this.mobileMegaToggle.addEventListener("click", () => this.toggleMobileServices());
    this.resourcesToggle.addEventListener("click", () => this.toggleResourcesMenu());
    this.mobileResourcesToggle.addEventListener("click", () => this.toggleMobileResources());

    this.drawer.addEventListener("click", (event) => {
      if (event.target === this.drawer) this.drawer.close();
    });

    this.mobileNavigation.addEventListener("click", (event) => {
      if (event.target === this.mobileNavigation) this.closeMobileNavigation();
    });

    this.mobileNavigation.addEventListener("close", () => {
      this.menuToggle.setAttribute("aria-expanded", "false");
      this.menuToggle.setAttribute("aria-label", "Open navigation");
      this.menuToggle.querySelector("i").className = "fa-solid fa-bars";
      this.closeMobileServices();
    });

    this.drawer.addEventListener("close", () => {
      this.drawerToggle.setAttribute("aria-expanded", "false");
    });

    this.querySelectorAll(".navigation-drawer a").forEach((link) => {
      link.addEventListener("click", () => this.closeMobileNavigation());
    });

    this.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      if (this.megaItem.classList.contains("is-open") || this.resourcesItem.classList.contains("is-open")) {
        const resourcesWereOpen = this.resourcesItem.classList.contains("is-open");
        this.closeMegaMenu();
        (resourcesWereOpen ? this.resourcesToggle : this.megaToggle).focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!this.contains(event.target)) this.closeMegaMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1100) {
        this.closeMobileNavigation();
      } else {
        this.closeMegaMenu();
      }
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
      "web-development.html": "services.html",
      "seo.html": "services.html",
      "digital-marketing.html": "services.html",
      "ai-automation.html": "services.html",
      "ui-ux-design.html": "services.html",
      "logo-design.html": "services.html",
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

  toggleMegaMenu() {
    this.closeResourcesMenu();
    const willOpen = !this.megaItem.classList.contains("is-open");
    this.megaItem.classList.toggle("is-open", willOpen);
    this.megaToggle.setAttribute("aria-expanded", String(willOpen));
    this.megaToggle.setAttribute("aria-label", willOpen ? "Close services menu" : "Open services menu");
    this.megaMenu.setAttribute("aria-hidden", String(!willOpen));
    this.megaMenu.inert = !willOpen;
  }

  closeMegaMenu() {
    this.megaItem.classList.remove("is-open");
    this.megaToggle.setAttribute("aria-expanded", "false");
    this.megaToggle.setAttribute("aria-label", "Open services menu");
    this.megaMenu.setAttribute("aria-hidden", "true");
    this.megaMenu.inert = true;
    this.closeResourcesMenu();
  }

  toggleResourcesMenu() {
    const willOpen = !this.resourcesItem.classList.contains("is-open");
    this.closeMegaMenu();
    this.resourcesItem.classList.toggle("is-open", willOpen);
    this.resourcesToggle.setAttribute("aria-expanded", String(willOpen));
    this.resourcesToggle.setAttribute("aria-label", willOpen ? "Close resources menu" : "Open resources menu");
    this.resourcesMenu.setAttribute("aria-hidden", String(!willOpen));
    this.resourcesMenu.inert = !willOpen;
  }

  closeResourcesMenu() {
    this.resourcesItem.classList.remove("is-open");
    this.resourcesToggle.setAttribute("aria-expanded", "false");
    this.resourcesToggle.setAttribute("aria-label", "Open resources menu");
    this.resourcesMenu.setAttribute("aria-hidden", "true");
    this.resourcesMenu.inert = true;
  }

  toggleMobileServices() {
    this.closeMobileResources();
    const willOpen = this.mobileServices.hidden;
    this.mobileServices.hidden = !willOpen;
    this.mobileMegaToggle.setAttribute("aria-expanded", String(willOpen));
    this.mobileMegaToggle.setAttribute("aria-label", willOpen ? "Hide services" : "Show services");
  }

  closeMobileServices() {
    this.mobileServices.hidden = true;
    this.mobileMegaToggle.setAttribute("aria-expanded", "false");
    this.mobileMegaToggle.setAttribute("aria-label", "Show services");
    this.closeMobileResources();
  }

  toggleMobileResources() {
    const willOpen = this.mobileResources.hidden;
    this.mobileServices.hidden = true;
    this.mobileMegaToggle.setAttribute("aria-expanded", "false");
    this.mobileResources.hidden = !willOpen;
    this.mobileResourcesToggle.setAttribute("aria-expanded", String(willOpen));
    this.mobileResourcesToggle.setAttribute("aria-label", willOpen ? "Hide resources" : "Show resources");
  }

  closeMobileResources() {
    this.mobileResources.hidden = true;
    this.mobileResourcesToggle.setAttribute("aria-expanded", "false");
    this.mobileResourcesToggle.setAttribute("aria-label", "Show resources");
  }

  openDrawer() {
    this.closeMobileNavigation();
    this.closeMegaMenu();
    this.drawerToggle.setAttribute("aria-expanded", "true");
    this.drawer.showModal();
  }

  toggleMobileNavigation() {
    if (this.mobileNavigation.open) {
      this.closeMobileNavigation();
    } else {
      this.openMobileNavigation();
    }
  }

  openMobileNavigation() {
    this.closeMegaMenu();
    this.menuToggle.setAttribute("aria-expanded", "true");
    this.menuToggle.setAttribute("aria-label", "Close navigation");
    this.menuToggle.querySelector("i").className = "fa-solid fa-xmark";
    this.mobileNavigation.showModal();
  }

  closeMobileNavigation() {
    if (this.mobileNavigation.open) this.mobileNavigation.close();
    this.closeMobileServices();
  }
}

if (!customElements.get("site-header")) {
  customElements.define("site-header", SiteHeader);
}
