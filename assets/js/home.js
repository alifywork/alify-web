"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animatePanel = (panel) => {
    if (reduceMotion || !window.gsap) return;
    const content = panel.querySelectorAll(".service-panel__content, .service-panel__visual");
    window.gsap.fromTo(content, {
      autoAlpha: 0,
      y: 18
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.07,
      ease: "power2.out",
      clearProps: "transform,opacity,visibility"
    });
  };

  const initializeTabs = (listSelector, panelSelector) => {
    const tabList = document.querySelector(listSelector);
    if (!tabList) return;

    const tabs = [...tabList.querySelectorAll("[role='tab']")];
    const panels = [...document.querySelectorAll(panelSelector)];

    const activateTab = (selectedTab, moveFocus = false) => {
      const selectedPanelId = selectedTab.getAttribute("aria-controls");
      const changed = selectedTab.getAttribute("aria-selected") !== "true";

      tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.hidden = panel.id !== selectedPanelId;
        if (!panel.hidden && changed) animatePanel(panel);
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
  };

  initializeTabs("[data-service-tabs]", "[data-service-panel]");

  const testimonialRegion = document.querySelector("[data-testimonials]");
  if (testimonialRegion) {
    const slides = [...testimonialRegion.querySelectorAll("[data-testimonial-slide]")];
    const toggle = testimonialRegion.querySelector("[data-testimonial-toggle]");
    const toggleIcon = toggle.querySelector("i");
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    let rotationTimer = null;
    let isPaused = reduceMotion;
    let isInView = false;

    const stopRotation = () => {
      window.clearInterval(rotationTimer);
      rotationTimer = null;
    };

    const startRotation = () => {
      if (isPaused || !isInView || document.hidden || rotationTimer) return;
      rotationTimer = window.setInterval(() => showSlide(activeIndex + 1), 6000);
    };

    const updateToggle = () => {
      toggle.setAttribute("aria-pressed", String(isPaused));
      toggle.setAttribute("aria-label", isPaused ? "Resume automatic testimonials" : "Pause automatic testimonials");
      toggleIcon.className = isPaused ? "fa-solid fa-play" : "fa-solid fa-pause";
    };

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const offset = (slideIndex - activeIndex + slides.length) % slides.length;
        slide.classList.remove("is-prev", "is-active", "is-next");
        slide.classList.add(offset === 0 ? "is-active" : offset === 1 ? "is-next" : "is-prev");
        slide.setAttribute("aria-hidden", String(offset !== 0));
        slide.inert = offset !== 0;
      });

      if (!reduceMotion && window.gsap) {
        window.gsap.fromTo(slides[activeIndex], {
          autoAlpha: 0,
          y: 14
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          clearProps: "transform,opacity,visibility"
        });
      }
    };

    const selectSlide = (index) => {
      showSlide(index);
      stopRotation();
      startRotation();
    };

    testimonialRegion.querySelector("[data-testimonial-prev]").addEventListener("click", () => selectSlide(activeIndex - 1));
    testimonialRegion.querySelector("[data-testimonial-next]").addEventListener("click", () => selectSlide(activeIndex + 1));

    toggle.addEventListener("click", () => {
      isPaused = !isPaused;
      updateToggle();
      if (isPaused) stopRotation();
      else startRotation();
    });

    testimonialRegion.addEventListener("mouseenter", stopRotation);
    testimonialRegion.addEventListener("mouseleave", startRotation);
    testimonialRegion.addEventListener("focusin", stopRotation);
    testimonialRegion.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!testimonialRegion.contains(document.activeElement)) startRotation();
      }, 0);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopRotation();
      else startRotation();
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        isInView = entries[0].isIntersecting;
        if (isInView) startRotation();
        else stopRotation();
      }, { threshold: 0.35 });
      observer.observe(testimonialRegion);
    } else {
      isInView = true;
      startRotation();
    }

    showSlide(activeIndex);
    if (reduceMotion) toggle.hidden = true;
    updateToggle();
  }

  const closeFaqItem = (item) => {
    item.classList.remove("is-open");
    item.querySelector("[data-faq-button]").setAttribute("aria-expanded", "false");
    item.querySelector(".faq-list__answer").setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll("[data-faq-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest("[data-faq-item]");
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      document.querySelectorAll("[data-faq-item].is-open").forEach((openItem) => {
        if (openItem !== item) closeFaqItem(openItem);
      });

      item.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
      item.querySelector(".faq-list__answer").setAttribute("aria-hidden", String(!willOpen));
    });
  });

  const faqSearch = document.querySelector("[data-faq-search]");
  const faqItems = [...document.querySelectorAll("[data-faq-item]")];
  const faqFilters = [...document.querySelectorAll("[data-faq-filter]")];
  const faqEmpty = document.querySelector("[data-faq-empty]");
  let activeFaqCategory = "all";

  const filterFaqs = () => {
    const query = faqSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const matchesCategory = activeFaqCategory === "all" || item.dataset.category === activeFaqCategory;
      const matchesSearch = !query || item.textContent.toLowerCase().includes(query);
      item.hidden = !(matchesCategory && matchesSearch);
      if (item.hidden) closeFaqItem(item);
      else visibleCount += 1;
    });

    faqEmpty.hidden = visibleCount > 0;
  };

  faqSearch.addEventListener("input", filterFaqs);
  faqFilters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFaqCategory = button.dataset.faqFilter;
      faqFilters.forEach((filter) => filter.setAttribute("aria-pressed", String(filter === button)));
      filterFaqs();
    });
  });

  const inquiryForm = document.querySelector("[data-inquiry-form]");
  if (inquiryForm) {
    const result = inquiryForm.querySelector("[data-inquiry-result]");
    const emailLink = inquiryForm.querySelector("[data-inquiry-email]");

    inquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!inquiryForm.checkValidity()) {
        inquiryForm.reportValidity();
        return;
      }

      const data = new FormData(inquiryForm);
      const name = String(data.get("name")).trim();
      const email = String(data.get("email")).trim();
      const service = String(data.get("service")).trim();
      const brief = String(data.get("brief")).trim();
      const subject = encodeURIComponent(`Project inquiry: ${service} — ${name}`);
      const body = encodeURIComponent(`Hello ALIFY,\n\n${brief}\n\nService: ${service}\nName: ${name}\nEmail: ${email}`);

      emailLink.href = `mailto:hello@alify.com?subject=${subject}&body=${body}`;
      result.hidden = false;
      inquiryForm.reset();
      result.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }

  const mobileCta = document.querySelector("[data-mobile-cta]");
  if (mobileCta) {
    const hero = document.querySelector(".home-hero");
    let isVisible = false;
    let isDismissed = false;
    let hideTimer = null;
    let scrollTicking = false;

    try {
      isDismissed = window.sessionStorage.getItem("alifyMobileCtaDismissed") === "true";
    } catch (error) {
      isDismissed = false;
    }

    const setMobileCtaVisibility = (shouldShow) => {
      if (isDismissed || shouldShow === isVisible) return;
      isVisible = shouldShow;
      window.clearTimeout(hideTimer);

      if (isVisible) {
        mobileCta.hidden = false;
        mobileCta.inert = false;
        mobileCta.setAttribute("aria-hidden", "false");
        window.requestAnimationFrame(() => mobileCta.classList.add("is-visible"));
      } else {
        mobileCta.classList.remove("is-visible");
        mobileCta.inert = true;
        mobileCta.setAttribute("aria-hidden", "true");
        hideTimer = window.setTimeout(() => {
          if (!isVisible) mobileCta.hidden = true;
        }, reduceMotion ? 0 : 220);
      }
    };

    const updateMobileCta = () => {
      const shouldShow = window.innerWidth <= 767 && window.scrollY > hero.offsetHeight * 0.65;
      setMobileCtaVisibility(shouldShow);
      scrollTicking = false;
    };

    window.addEventListener("scroll", () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(updateMobileCta);
    }, { passive: true });
    window.addEventListener("resize", updateMobileCta);

    mobileCta.querySelector("[data-mobile-cta-close]").addEventListener("click", () => {
      isDismissed = true;
      isVisible = false;
      window.clearTimeout(hideTimer);
      mobileCta.classList.remove("is-visible");
      mobileCta.hidden = true;
      mobileCta.inert = true;
      mobileCta.setAttribute("aria-hidden", "true");
      try {
        window.sessionStorage.setItem("alifyMobileCtaDismissed", "true");
      } catch (error) {
        // Dismissal still works when browser storage is unavailable.
      }
    });

    updateMobileCta();
  }

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

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

  window.gsap.to(".home-hero__media", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".home-hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  window.gsap.from("[data-process-progress]", {
    scaleX: 0,
    duration: 1.1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".process-progress",
      start: "top 85%",
      once: true
    }
  });
});
