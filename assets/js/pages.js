"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const targetSelector = group.dataset.filterGroup;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const buttons = [...group.querySelectorAll("[data-filter]")];
    const items = [...target.querySelectorAll("[data-category]")];

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        items.forEach((item) => {
          item.hidden = filter !== "all" && item.dataset.category !== filter;
        });
      });
    });
  });

  const closeFaqItem = (item) => {
    item.classList.remove("is-open");
    item.querySelector("[data-faq-button]").setAttribute("aria-expanded", "false");
    item.querySelector(".faq-list__answer").setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest("[data-faq-item]");
      const list = item.closest(".faq-list");
      const willOpen = button.getAttribute("aria-expanded") !== "true";
      list.querySelectorAll("[data-faq-item].is-open").forEach((openItem) => {
        if (openItem !== item) closeFaqItem(openItem);
      });
      item.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      item.querySelector(".faq-list__answer").setAttribute("aria-hidden", String(!willOpen));
    });
  });

  document.querySelectorAll(".faq-content").forEach((content) => {
    const search = content.querySelector("[data-faq-search]");
    const items = [...content.querySelectorAll("[data-faq-item]")];
    const filters = [...content.querySelectorAll("[data-faq-filter]")];
    const empty = content.querySelector("[data-faq-empty]");
    let activeCategory = "all";

    const filterFaqs = () => {
      const query = search.value.trim().toLowerCase();
      let visibleCount = 0;
      items.forEach((item) => {
        const matchesCategory = activeCategory === "all" || item.dataset.category === activeCategory;
        const matchesSearch = !query || item.textContent.toLowerCase().includes(query);
        item.hidden = !(matchesCategory && matchesSearch);
        if (item.hidden) closeFaqItem(item);
        else visibleCount += 1;
      });
      empty.hidden = visibleCount > 0;
    };

    search.addEventListener("input", filterFaqs);
    filters.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.faqFilter;
        filters.forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
        filterFaqs();
      });
    });
  });

  document.querySelectorAll("form[data-inquiry-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const lines = [];
      for (const [key, value] of data.entries()) {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
        lines.push(`${label}: ${value}`);
      }

      const subject = `Project inquiry — ${data.get("name") || "Website"}`;
      const body = `Hello Alify,\n\n${lines.join("\n")}\n\nI would like to discuss this project with you.`;
      window.location.href = `mailto:hello@alify.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.utils.toArray("[data-page-reveal]").forEach((element) => {
    window.gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true
      },
      y: 32,
      duration: 0.75,
      ease: "power3.out"
    });
  });
});
