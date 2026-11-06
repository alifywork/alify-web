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
      autoAlpha: 0,
      duration: 0.75,
      ease: "power3.out"
    });
  });
});
