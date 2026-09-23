(function () {
  const storageKey = "xinmeiPortfolioData";
  let data = loadData();
  const form = document.querySelector("#cms-form");
  const editor = document.querySelector("#project-editor");

  function loadData() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || window.PORTFOLIO_DATA;
    } catch {
      return window.PORTFOLIO_DATA;
    }
  }

  function projectTemplate(project, index) {
    return `
      <article class="project-edit-card" data-index="${index}">
        <div class="admin-panel-heading">
          <h3>Project ${index + 1}</h3>
          <label class="inline-check"><input type="checkbox" name="featured-${index}" ${project.featured ? "checked" : ""}> Featured</label>
        </div>
        <label>Title <input name="title-${index}" value="${escapeAttr(project.title)}"></label>
        <label>Type <input name="type-${index}" value="${escapeAttr(project.type)}"></label>
        <label>URL <input name="url-${index}" value="${escapeAttr(project.url)}"></label>
        <label>Button label <input name="action-${index}" value="${escapeAttr(project.action)}"></label>
        <label>Description <textarea name="description-${index}" rows="4">${escapeHtml(project.description)}</textarea></label>
        <label>Bullets, one per line <textarea name="bullets-${index}" rows="4">${escapeHtml((project.bullets || []).join("\n"))}</textarea></label>
        <button class="remove-project" type="button" data-index="${index}">Remove</button>
      </article>
    `;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll('"', "&quot;");
  }

  function render() {
    form.email.value = data.contact.email || "";
    form.phone.value = data.contact.phone || "";
    form.resume.value = data.contact.resume || "";
    editor.innerHTML = data.projects.map(projectTemplate).join("");
  }

  function readForm() {
    return {
      contact: {
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        resume: form.resume.value.trim()
      },
      projects: data.projects.map((_, index) => ({
        title: form[`title-${index}`].value.trim(),
        type: form[`type-${index}`].value.trim(),
        url: form[`url-${index}`].value.trim(),
        action: form[`action-${index}`].value.trim(),
        featured: form[`featured-${index}`].checked,
        description: form[`description-${index}`].value.trim(),
        bullets: form[`bullets-${index}`].value.split("\n").map((item) => item.trim()).filter(Boolean)
      }))
    };
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    data = readForm();
    localStorage.setItem(storageKey, JSON.stringify(data, null, 2));
    alert("Saved. Open the portfolio page in this browser to see the update.");
  });

  document.querySelector("#add-project").addEventListener("click", () => {
    data = readForm();
    data.projects.push({ title: "New project", type: "Website", url: "", action: "View", featured: false, description: "", bullets: [] });
    render();
  });

  editor.addEventListener("click", (event) => {
    if (!event.target.matches(".remove-project")) return;
    data = readForm();
    data.projects.splice(Number(event.target.dataset.index), 1);
    render();
  });

  document.querySelector("#export-json").addEventListener("click", () => {
    data = readForm();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "xinmei-portfolio-data.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.querySelector("#import-button").addEventListener("click", () => {
    const value = document.querySelector("#import-json").value;
    data = JSON.parse(value);
    localStorage.setItem(storageKey, JSON.stringify(data, null, 2));
    render();
  });

  document.querySelector("#reset-cms").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    data = window.PORTFOLIO_DATA;
    render();
  });

  render();
})();
