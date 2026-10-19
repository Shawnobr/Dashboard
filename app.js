(() => {
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const grid = document.getElementById("project-grid");
  const filters = document.getElementById("filters");
  const search = document.getElementById("project-search");
  const count = document.getElementById("project-count");
  const empty = document.getElementById("empty-state");
  let activeCategory = "All";

  const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];
  filters.innerHTML = categories.map(category =>
    `<button class="filter${category === "All" ? " active" : ""}" data-category="${escapeHtml(category)}">${category === "All" ? "All work" : escapeHtml(category)}</button>`
  ).join("");

  filters.addEventListener("click", event => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    filters.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    render();
  });
  search.addEventListener("input", render);

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function safeUrl(value) {
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
    } catch {
      return "#";
    }
  }

  function render() {
    const term = search.value.trim().toLowerCase();
    const visible = projects.filter(project => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const searchable = [project.name, project.category, project.description, ...(project.tags || [])].join(" ").toLowerCase();
      return matchesCategory && searchable.includes(term);
    });

    count.textContent = String(visible.length).padStart(2, "0");
    empty.hidden = visible.length > 0;
    grid.innerHTML = visible.map(project => {
      const status = project.status || "PROJECT";
      const live = /live|complete|launched/i.test(status);
      const tags = (project.tags || []).slice(0, 3).map(tag => `<span class="card-tag">${escapeHtml(tag)}</span>`).join("");
      const href = safeUrl(project.url || "#");
      return `
        <a class="project-card" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">
          <div class="card-top">
            <span class="project-type">${escapeHtml(project.category || "Project")}</span>
            <span class="project-status${live ? " live" : ""}">${escapeHtml(status)}</span>
          </div>
          <div class="project-icon" aria-hidden="true">${escapeHtml(project.icon || "↗")}</div>
          <h3>${escapeHtml(project.name || "Untitled project")}</h3>
          <p>${escapeHtml(project.description || "")}</p>
          <div class="card-bottom">
            <div class="card-tags">${tags}</div>
            <span class="card-open" aria-hidden="true">↗</span>
          </div>
        </a>`;
    }).join("");
  }
  render();
})();
