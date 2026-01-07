function route(page) {
  const view = document.getElementById("view");
  const user = JSON.parse(localStorage.getItem("session"));
  const project = getActiveProject();

  // DASHBOARD
  if (page === "dashboard") {
    view.innerHTML = `
      <div class="card">
        <h2>Dashboard</h2>
        ${project
          ? `<p>Active Project: <strong>${project.name}</strong></p>`
          : `<p>No project selected</p>`}
      </div>

      ${user.role === "builder" ? `
      <div class="card">
        <h3>Create Project</h3>
        <input id="projectName" class="input" placeholder="Project name">
        <input id="projectBudget" class="input" placeholder="Budget">
        <button class="btn-primary" onclick="createProject()">Create</button>
      </div>` : ""}
    `;
  }

  // TASKS
  if (page === "tasks") {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const filtered = tasks.filter(t =>
      project && t.projectId === project.id &&
      (user.role === "builder" || t.assignedTo === user.role)
    );

    view.innerHTML = `
      <div class="card">
        <h2>Tasks</h2>
        ${user.role === "builder" ? `
        <h4>Create Task</h4>
        <input id="taskTitle" class="input" placeholder="Task title">
        <select id="taskType" class="input">
          <option>Inspection</option>
          <option>Construction</option>
          <option>Review</option>
          <option>Admin</option>
        </select>
        <select id="taskAssignee" class="input">
          <option value="contractor">Contractor</option>
        </select>
        <input id="taskStart" class="input" type="date">
        <input id="taskEnd" class="input" type="date">
        <button class="btn-primary" onclick="createTask()">Add Task</button>
        ` : ""}
      </div>

      ${filtered.map(t => `
        <div class="card">
          <strong>${t.title}</strong><br>
          Type: ${t.type}<br>
          Status:
          <select id="status-${t.id}">
            ${["To Do","In Progress","Blocked","Paused","Done"]
              .map(s => `<option ${t.status===s?"selected":""}>${s}</option>`).join("")}
          </select>

          ${(t.status==="Blocked"||t.status==="Paused") ? `
            <input id="reason-${t.id}" class="input" placeholder="Reason" value="${t.reason}">
          ` : ""}

          <button onclick="updateTaskStatus('${t.id}')">Update</button>
        </div>
      `).join("")}
    `;
  }
}
