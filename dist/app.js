(function () {
  const defaults = window.PORTFOLIO_DATA || { contact: {}, projects: [] };

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
      const link = project.url
        ? `<a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(project.action || "View")}</a>`
        : `<span>${escapeHtml(project.action || "Case study")}</span>`;
      const bullets = project.bullets && project.bullets.length
        ? `<ul>${project.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";
      return `
        <article class="project-card ${project.featured ? "featured" : ""}">
          <div class="project-meta">
            <span>${escapeHtml(project.type)}</span>
            ${link}
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          ${bullets}
        </article>
      `;
    }).join("");
  }

  function renderContact(data) {
    const email = document.querySelector("#contact-email");
    const phone = document.querySelector("#contact-phone");
    if (email && data.contact.email) {
      email.href = `mailto:${data.contact.email}`;
      email.textContent = data.contact.email;
    }
    if (phone && data.contact.phone) {
      phone.href = `tel:${data.contact.phone.replace(/[^+\d]/g, "")}`;
      phone.textContent = data.contact.phone;
    }
  }

  window.XMPortfolio = { defaults, getData };
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
