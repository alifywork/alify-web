"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const tabList = document.querySelector("[data-service-tabs]");

  if (tabList) {
    const tabs = [...tabList.querySelectorAll("[role='tab']")];
    const panels = [...document.querySelectorAll("[data-service-panel]")];

    const activateTab = (selectedTab, moveFocus = false) => {
      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
      });

      if (moveFocus) selectedTab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });
  }

  const testimonialRegion = document.querySelector("[data-testimonials]");
  if (testimonialRegion) {
    const slides = [...testimonialRegion.querySelectorAll("[data-testimonial-slide]")];
    const dots = [...testimonialRegion.querySelectorAll("[data-testimonial-dot]")];
    let activeIndex = 0;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== activeIndex;
      });
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", String(isActive));
      });
    };

    testimonialRegion.querySelector("[data-testimonial-prev]").addEventListener("click", () => showSlide(activeIndex - 1));
    testimonialRegion.querySelector("[data-testimonial-next]").addEventListener("click", () => showSlide(activeIndex + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
  }

  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-list__item");
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      document.querySelectorAll(".faq-list__item.is-open").forEach((openItem) => {
        if (openItem === item) return;
        openItem.classList.remove("is-open");
        openItem.querySelector("[data-faq-button]").setAttribute("aria-expanded", "false");
        openItem.querySelector(".faq-list__answer").setAttribute("aria-hidden", "true");
      });

      item.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      item.querySelector(".faq-list__answer").setAttribute("aria-hidden", String(!willOpen));
    });
  });

  if (!window.gsap || !window.ScrollTrigger || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.utils.toArray("[data-home-reveal]").forEach((element) => {
    window.gsap.from(element, {
      y: 36,
      autoAlpha: 0,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true
      }
    });
  });
});
