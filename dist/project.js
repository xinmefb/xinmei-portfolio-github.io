(function () {
  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function renderMissing() {
    document.querySelector("#project-title").textContent = "Project not found";
    document.querySelector("#project-description").textContent = "Return to the portfolio and choose a project from the list.";
    document.querySelector("#project-detail-actions").innerHTML = '<a class="button primary" href="index.html#projects">Back to projects</a>';
    document.querySelector("#project-detail-body").innerHTML = "";
  }

  function renderProject(project) {
    document.title = `${project.title} | Xin Mei Portfolio`;
    document.querySelector("#project-title").textContent = project.title;
    document.querySelector("#project-description").textContent = project.description || "";

    const actions = [`<a class="button primary" href="index.html#projects">Back to projects</a>`];
    if (project.url) {
      actions.push(`<a class="button secondary" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(project.action || "Visit")}</a>`);
    }
    document.querySelector("#project-detail-actions").innerHTML = actions.join("");

    const details = project.details && project.details.length
      ? project.details
      : [project.description || "More details can be added through the CMS."];
    const bullets = project.bullets && project.bullets.length
      ? `<div class="detail-points"><h3>Highlights</h3><ul>${project.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`
      : "";

    document.querySelector("#project-detail-body").innerHTML = `
      <p class="project-type">${escapeHtml(project.type)}</p>
      ${details.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      ${bullets}
    `;
  }

  async function init() {
    const slug = new URLSearchParams(window.location.search).get("project");
    const response = await fetch("content/portfolio.json", { cache: "no-store" });
    if (!response.ok) {
      renderMissing();
      return;
    }
    const data = await response.json();
    const project = (data.projects || []).find((item) => (item.slug || slugify(item.title)) === slug);
    if (!project) {
      renderMissing();
      return;
    }
    renderProject(project);
  }

  init().catch(renderMissing);
})();
