"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const targetSelector = group.dataset.filterGroup;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const buttons = [...group.querySelectorAll("[data-filter]")];
    const items = [...target.querySelectorAll("[data-category]")];
    const search = group.querySelector("[data-article-search]");
    const empty = target.parentElement.querySelector("[data-article-empty]");
    let activeFilter = "all";

    const applyFilters = () => {
      const query = search ? search.value.trim().toLowerCase() : "";
      let visibleCount = 0;
      items.forEach((item) => {
        const matchesCategory = activeFilter === "all" || item.dataset.category === activeFilter;
        const matchesSearch = !query || item.textContent.toLowerCase().includes(query);
        item.hidden = !(matchesCategory && matchesSearch);
        if (!item.hidden) visibleCount += 1;
      });
      if (empty) empty.hidden = visibleCount > 0;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        applyFilters();
      });
    });
    if (search) search.addEventListener("input", applyFilters);
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
    const dialog = document.querySelector("[data-inquiry-review]");
    const status = form.querySelector("[data-submit-status]");
    const draftStatus = form.querySelector("[data-draft-status]");
    const submitButton = form.querySelector('[type="submit"]');
    const draftKey = `alify-inquiry-draft:${window.location.pathname}`;
    let saveTimer;
    const saveDraft = () => {
      const draft = {};
      new FormData(form).forEach((value, key) => {
        if (value instanceof File || key === "privacyConsent" || key === "website") return;
        if (draft[key] !== undefined) draft[key] = Array.isArray(draft[key]) ? [...draft[key], value] : [draft[key], value];
        else draft[key] = value;
      });
      try {
        localStorage.setItem(draftKey, JSON.stringify(draft));
        if (draftStatus) draftStatus.textContent = "Draft saved in this browser. You can return on this device to resume.";
      } catch { if (draftStatus) draftStatus.textContent = "Browser draft storage is unavailable; you can still submit the form."; }
    };
    try {
      const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (saved) {
        Object.entries(saved).forEach(([key, value]) => {
          const fields = [...form.elements].filter((field) => field.name === key);
          fields.forEach((field) => {
            if (field.type === "checkbox") field.checked = Array.isArray(value) ? value.includes(field.value) : value === field.value;
            else field.value = Array.isArray(value) ? value[0] : value;
          });
        });
        if (draftStatus) draftStatus.textContent = "Your saved draft has been restored. Attachments need to be selected again.";
      }
    } catch { /* Invalid browser drafts are ignored. */ }
    form.addEventListener("input", () => { window.clearTimeout(saveTimer); saveTimer = window.setTimeout(saveDraft, 350); });

    if (dialog) {
      dialog.querySelectorAll("[data-review-edit]").forEach((button) => button.addEventListener("click", () => dialog.close()));
      dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
      dialog.querySelector("[data-review-confirm]").addEventListener("click", async () => {
        const confirm = dialog.querySelector("[data-review-confirm]");
        confirm.disabled = true;
        submitButton.disabled = true;
        status.hidden = false;
        status.className = "form-submit-status";
        status.textContent = "Securely saving your inquiry…";
        try {
          const response = await fetch("/api/inquiries", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
          const result = await response.json();
          if (!response.ok || !result.ok) throw new Error(result.message || "Submission failed");
          dialog.close();
          form.reset();
          try { localStorage.removeItem(draftKey); } catch { /* Storage is optional. */ }
          if (draftStatus) draftStatus.textContent = "";
          window.location.assign(`/thank-you.html?reference=${encodeURIComponent(result.reference)}`);
        } catch (error) {
          status.className = "form-submit-status is-error";
          status.textContent = `${error.message}. Your draft remains saved; please try again or email hello@alify.com.`;
        } finally {
          confirm.disabled = false;
          submitButton.disabled = false;
        }
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (!dialog) return;
      const content = dialog.querySelector("[data-review-content]");
      content.replaceChildren();
      const grouped = new Map();
      for (const [key, value] of new FormData(form).entries()) {
        if (["privacyConsent", "website"].includes(key)) continue;
        const label = key.replace(/\[\]/g, "").replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
        if (!grouped.has(label)) grouped.set(label, []);
        grouped.get(label).push(value instanceof File ? value.name : value);
      }
      grouped.forEach((values, label) => {
        const row = document.createElement("div");
        const term = document.createElement("dt");
        const detail = document.createElement("dd");
        term.textContent = label;
        detail.textContent = values.join(", ");
        row.append(term, detail);
        content.append(row);
      });
      dialog.showModal();
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
