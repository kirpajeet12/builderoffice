function daysBetween(start, end) {
  return (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
}

function getColor(status) {
  if (status === "Done") return "#10B981";
  if (status === "In Progress") return "#3B82F6";
  if (status === "Blocked" || status === "Paused") return "#EF4444";
  return "#F59E0B";
}

function renderGantt() {
  const view = document.getElementById("view");
  const project = getActiveProject();
  if (!project) {
    view.innerHTML = "<p>No active project</p>";
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks"))
    .filter(t => t.projectId === project.id);

  const startDates = tasks.map(t => new Date(t.startDate));
  const minDate = new Date(Math.min(...startDates));

  view.innerHTML = `
    <div class="card gantt">
      <h2>Project Schedule (Gantt)</h2>
      ${tasks.map(task => {
        const offset = daysBetween(minDate, task.startDate) * 20;
        const width = daysBetween(task.startDate, task.endDate) * 20;
        return `
          <div class="gantt-row">
            <div class="gantt-label">${task.title}</div>
            <div class="gantt-track">
              <div class="gantt-bar"
                   style="left:${offset}px;width:${width}px;
                          background:${getColor(task.status)}">
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}
