(function () {
  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = tabs.querySelectorAll("[data-tab-target]");
    const panels = tabs.querySelectorAll("[data-tab-panel]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-tab-target");
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.getAttribute("data-tab-panel") === target);
        });
      });
    });
  });

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const preview = gallery.querySelector("[data-gallery-preview]");
    const thumbs = gallery.querySelectorAll("[data-gallery-thumb]");
    if (!preview) return;

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbs.forEach((item) => item.classList.toggle("is-active", item === thumb));
        preview.innerHTML = `<span>${thumb.getAttribute("data-gallery-thumb") || thumb.textContent}</span>`;
      });
    });
  });

  const motionQuery = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  const reducedMotion = motionQuery && motionQuery.matches;
  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  const parallaxItems = document.querySelectorAll("[data-parallax-speed]");

  if (!reducedMotion && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (reducedMotion || !parallaxItems.length) return;

  let ticking = false;
  const updateParallax = () => {
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallaxSpeed || 0.5);
      const rect = item.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;
      const itemMiddle = rect.top + rect.height / 2;
      const offset = (viewportMiddle - itemMiddle) * speed * 0.18;
      item.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  updateParallax();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();
