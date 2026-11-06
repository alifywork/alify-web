"use strict";

document.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return;

  const { gsap } = window;
  const hasScrollTrigger = Boolean(window.ScrollTrigger);

  if (hasScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  // Respect the visitor's motion preference before creating animations.
  const motion = gsap.matchMedia();
  motion.add("(prefers-reduced-motion: no-preference)", () => {
    const introElements = gsap.utils.toArray(".intro > *");
    const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (document.querySelector(".site-header")) {
      introTimeline.from(".site-header", {
        y: -24,
        autoAlpha: 0,
        duration: 0.65,
        clearProps: "transform"
      });
    }

    if (introElements.length) {
      introTimeline.from(introElements, {
        y: 28,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.08
      }, "-=0.3");
    }

    if (hasScrollTrigger && document.querySelector(".footer-cta__inner")) {
      gsap.from(".footer-cta__inner > *", {
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top 85%",
          once: true
        },
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });
    }
  });
});
