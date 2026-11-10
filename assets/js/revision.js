"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('.social-links a[href="#"], .review-slider__source a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  // FAQ categories belong with the page introduction/CTA; search is retired.
  // Existing filter listeners remain attached when the controls move.
  document.querySelectorAll(".faq-content").forEach((content) => {
    const section = content.closest("section");
    const heading = section?.querySelector(".section-heading, .detail-heading, .page-heading");
    const filters = content.querySelector(".faq-filters");
    if (heading && filters) {
      filters.classList.add("faq-filters--relocated");
      heading.append(filters);
    }
    const search = content.querySelector(".faq-search");
    if (search) search.hidden = true;
    const tools = content.querySelector(".faq-tools");
    if (tools && !tools.children.length) tools.remove();
  });

  // Centre-active, one-at-a-time review slider.
  document.querySelectorAll("[data-review-slider]").forEach((slider) => {
    const track = slider.querySelector(".review-slider__track");
    const slides = [...slider.querySelectorAll("[data-review-slide]")];
    const previous = slider.querySelector("[data-review-prev]");
    const next = slider.querySelector("[data-review-next]");
    const current = slider.querySelector("[data-review-current]");
    let active = 0;
    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === active);
        slide.setAttribute("aria-hidden", String(slideIndex !== active));
        slide.inert = slideIndex !== active;
      });
      const left = slides[active].offsetLeft - (track.clientWidth - slides[active].clientWidth) / 2;
      track.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
      current.textContent = String(active + 1);
    };
    previous.addEventListener("click", () => show(active - 1));
    next.addEventListener("click", () => show(active + 1));
    slider.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); show(active + 1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); show(active - 1); }
    });
    show(0);
  });

  // Native accessible project lightbox, shared by every project/case single.
  const projectMain = document.querySelector('main.inner-page');
  const isProject = document.body.matches('.page-project-single, .page-commerce-project, .page-identity-project, .page-property-project, .page-wellness-project, .page-case-study-single');
  if (projectMain && isProject) {
    const images = [...projectMain.querySelectorAll('.case-overview img, .case-experience img, .project-artifacts img')]
      .filter((image, index, all) => all.findIndex((candidate) => candidate.src === image.src) === index);
    if (images.length) {
      const section = document.createElement("section");
      section.className = "project-gallery";
      section.setAttribute("aria-labelledby", "project-gallery-title");
      section.innerHTML = `<div class="container"><div class="row"><div class="col-12"><div class="detail-heading"><p class="page-eyebrow">Project gallery</p><h2 class="page-title" id="project-gallery-title">Explore the concept screens.</h2><p class="page-lead">Select any screen to open the accessible lightbox.</p></div><div class="project-gallery__grid"></div></div></div></div>`;
      const grid = section.querySelector(".project-gallery__grid");
      images.forEach((image, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "project-gallery__item";
        button.setAttribute("aria-label", `Open project screen ${index + 1}`);
        const clone = image.cloneNode();
        clone.loading = "lazy";
        button.append(clone);
        button.addEventListener("click", () => openLightbox(index));
        grid.append(button);
      });
      const nextSection = projectMain.querySelector(".case-next");
      projectMain.insertBefore(section, nextSection || null);

      const dialog = document.createElement("dialog");
      dialog.className = "project-lightbox";
      dialog.setAttribute("aria-label", "Project gallery lightbox");
      dialog.innerHTML = `<div class="project-lightbox__bar"><p data-lightbox-caption></p><button class="carousel-button" type="button" data-lightbox-close aria-label="Close gallery"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button></div><img data-lightbox-image alt=""><div class="project-lightbox__bar"><p data-lightbox-count></p><div class="project-lightbox__controls"><button class="carousel-button" type="button" data-lightbox-prev aria-label="Previous screen"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button><button class="carousel-button" type="button" data-lightbox-next aria-label="Next screen"><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button></div></div>`;
      document.body.append(dialog);
      let activeImage = 0;
      const update = () => {
        const source = images[activeImage];
        const display = dialog.querySelector("[data-lightbox-image]");
        display.src = source.src;
        display.alt = source.alt;
        dialog.querySelector("[data-lightbox-caption]").textContent = source.alt;
        dialog.querySelector("[data-lightbox-count]").textContent = `${activeImage + 1} / ${images.length}`;
      };
      function openLightbox(index) {
        activeImage = index;
        update();
        dialog.showModal();
      }
      dialog.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
      dialog.querySelector("[data-lightbox-prev]").addEventListener("click", () => { activeImage = (activeImage - 1 + images.length) % images.length; update(); });
      dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => { activeImage = (activeImage + 1) % images.length; update(); });
      dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") { activeImage = (activeImage + 1) % images.length; update(); }
        if (event.key === "ArrowLeft") { activeImage = (activeImage - 1 + images.length) % images.length; update(); }
      });
    }
  }

  // Blog count, reset and URL-persisted filter state.
  const blogGroup = document.querySelector('[data-filter-group][data-article-search]') || document.querySelector('[data-filter-group]');
  const blogSearch = blogGroup?.querySelector("[data-article-search]");
  if (blogGroup && blogSearch) {
    const target = document.querySelector(blogGroup.dataset.filterGroup);
    const cards = [...target.querySelectorAll("[data-category]")];
    const buttons = [...blogGroup.querySelectorAll("[data-filter]")];
    const status = document.createElement("div");
    status.className = "blog-filter-status";
    status.innerHTML = '<p role="status" data-blog-count></p><button class="filter-reset" type="button" data-blog-reset>Clear search &amp; filters</button>';
    blogGroup.append(status);
    const count = status.querySelector("[data-blog-count]");
    const updateUrl = () => {
      const url = new URL(window.location.href);
      const active = blogGroup.querySelector('[data-filter][aria-pressed="true"]')?.dataset.filter || "all";
      if (blogSearch.value.trim()) url.searchParams.set("q", blogSearch.value.trim()); else url.searchParams.delete("q");
      if (active !== "all") url.searchParams.set("category", active); else url.searchParams.delete("category");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      const visible = cards.filter((card) => !card.hidden).length;
      count.textContent = `${visible} ${visible === 1 ? "article" : "articles"} found`;
    };
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q") || "";
    const initialCategory = params.get("category") || "all";
    blogSearch.value = initialQuery;
    (buttons.find((button) => button.dataset.filter === initialCategory) || buttons[0]).click();
    blogSearch.dispatchEvent(new Event("input", { bubbles: true }));
    blogGroup.addEventListener("click", (event) => { if (event.target.closest("[data-filter]")) window.setTimeout(updateUrl, 0); });
    blogSearch.addEventListener("input", updateUrl);
    status.querySelector("[data-blog-reset]").addEventListener("click", () => {
      blogSearch.value = "";
      buttons[0].click();
      blogSearch.dispatchEvent(new Event("input", { bubbles: true }));
      blogSearch.focus();
      updateUrl();
    });
    updateUrl();
  }

  // Native progress element avoids inline styling and works with reduced motion.
  if (document.querySelector(".article-body-section")) {
    const progress = document.createElement("progress");
    progress.className = "reading-progress";
    progress.max = 100;
    progress.value = 0;
    progress.setAttribute("aria-label", "Article reading progress");
    document.body.prepend(progress);
    let scheduled = false;
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      progress.value = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      scheduled = false;
    };
    window.addEventListener("scroll", () => {
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateProgress); }
    }, { passive: true });
    updateProgress();
  }
});
