function isToday(date) {
  const d = new Date(date);
  const t = new Date();
  return d.toDateString() === t.toDateString();
}

function renderCalendar() {
  const view = document.getElementById("view");
  const project = getActiveProject();
  if (!project) return;

  const tasks = JSON.parse(localStorage.getItem("tasks"))
    .filter(t => t.projectId === project.id);

  const today = new Date();

  const todoToday = tasks.filter(t => isToday(t.startDate));
  const overdue = tasks.filter(t =>
    new Date(t.endDate) < today && t.status !== "Done"
  );

  view.innerHTML = `
    <div class="card">
      <h2>To-Do</h2>
      <div class="todo-section">
        <h4>Today</h4>
        ${todoToday.map(t => `<div>${t.title}</div>`).join("") || "No tasks"}
      </div>
      <div class="todo-section">
        <h4>Overdue</h4>
        ${overdue.map(t => `<div>${t.title}</div>`).join("") || "None"}
      </div>
    </div>
  `;
}
