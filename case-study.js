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
})();
