(function () {
  const defaults = window.PORTFOLIO_DATA || { contact: {}, projects: [] };
  const savedTheme = localStorage.getItem("xm-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("xm-theme", theme);
    const toggle = document.querySelector("[data-theme-toggle]");
    if (toggle) {
      toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  setTheme(savedTheme || (prefersDark ? "dark" : "light"));

  async function getData() {
    const response = await fetch("content/portfolio.json", { cache: "no-store" });
    if (!response.ok) return defaults;
    return response.json();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderProjects(data) {
    const grid = document.querySelector("#project-grid");
    if (!grid) return;

    grid.innerHTML = data.projects.map((project) => {
      const slug = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const detailHref = project.detailPage || `project.html?project=${slug}`;
      const externalLink = project.url
        ? `<a class="project-button secondary" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(project.action || "Visit")}</a>`
        : "";
      const bullets = project.bullets && project.bullets.length
        ? `<ul>${project.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";
      return `
        <article class="project-card ${project.featured ? "featured" : ""} reveal-on-scroll" data-parallax-speed="0.5">
          <div class="project-meta">
            <span>${escapeHtml(project.type)}</span>
            <span>${project.featured ? "Featured" : "Project"}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          ${bullets}
          <div class="project-actions">
            <a class="project-button primary" href="${escapeHtml(detailHref)}">View details</a>
            ${externalLink}
          </div>
        </article>
      `;
    }).join("");

    if (window.XMReveal) window.XMReveal();
  }

  function renderContact(data) {
    const email = document.querySelector("#contact-email");
    const phone = document.querySelector("#contact-phone");
    const whatsapp = document.querySelector("#contact-whatsapp");
    const linkedin = document.querySelector("#contact-linkedin");
    if (email && data.contact.email) {
      email.href = `mailto:${data.contact.email}`;
      email.textContent = data.contact.email;
    }
    if (phone && data.contact.phone) {
      phone.href = `tel:${data.contact.phone.replace(/[^+\d]/g, "")}`;
      phone.textContent = data.contact.phone;
    }
    if (whatsapp && data.contact.whatsapp) {
      whatsapp.href = data.contact.whatsapp;
    }
    if (linkedin && data.contact.linkedin) {
      linkedin.href = data.contact.linkedin;
    }
  }

  function bindThemeToggle() {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  function bindSkillTabs() {
    const root = document.querySelector("[data-skill-tabs]");
    if (!root) return;
    const tabs = root.querySelectorAll("[data-skill-tab]");
    const panels = root.querySelectorAll("[data-skill-panel]");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-skill-tab");
        tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.getAttribute("data-skill-panel") === target);
        });
      });
    });
  }

  function bindScrollEffects() {
    const motionQuery = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery && motionQuery.matches;
    const effectSelectors = [
      ".section-heading",
      ".skills-layout",
      ".about-grid article",
      ".location-section > *",
      ".map-card",
      ".contact > *",
      ".contact-form"
    ];

    document.querySelectorAll(effectSelectors.join(",")).forEach((item) => {
      item.classList.add("reveal-on-scroll");
    });

    const observer = !reducedMotion && "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.16 })
      : null;

    const observeRevealItems = () => {
      const revealItems = document.querySelectorAll(".reveal-on-scroll:not(.is-visible)");
      if (!observer) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
      }
      revealItems.forEach((item) => observer.observe(item));
    };

    window.XMReveal = observeRevealItems;
    observeRevealItems();

    if (reducedMotion) return;

    let ticking = false;
    const updateParallax = () => {
      const parallaxItems = document.querySelectorAll("[data-parallax-speed]");
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
  }

  window.XMPortfolio = { defaults, getData };
  bindThemeToggle();
  bindSkillTabs();
  bindScrollEffects();
  getData()
    .then((data) => {
      renderProjects(data);
      renderContact(data);
    })
    .catch(() => {
      renderProjects(defaults);
      renderContact(defaults);
    });
})();
