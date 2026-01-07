function route(page) {
  const view = document.getElementById("view");
  const user = JSON.parse(localStorage.getItem("session"));
  const project = getActiveProject();

  /* ===============================
     DASHBOARD
  =============================== */
  if (page === "dashboard") {
    let activityHtml = "";

    if (project) {
      const activity = getProjectActivity(project.id);
      activityHtml = `
        <div class="card">
          <h3>Recent Activity</h3>
          ${activity.length === 0
            ? "<p>No activity yet</p>"
            : activity.map(a => `
                <div style="font-size:14px;margin-bottom:6px">
                  ${a.message}<br>
                  <small>${new Date(a.timestamp).toLocaleString()}</small>
                </div>
              `).join("")}
        </div>
      `;
    }

    view.innerHTML = `
      <div class="card">
        <h2>Dashboard</h2>
        ${
          project
            ? `<p><strong>Active Project:</strong> ${project.name}</p>`
            : `<p>No active project</p>`
        }
      </div>

      ${
        user.role === "builder"
          ? `
        <div class="card">
          <h3>Create Project</h3>
          <input id="projectName" class="input" placeholder="Project name">
          <input id="projectBudget" class="input" placeholder="Budget">
          <button class="btn-primary" onclick="createProject()">Create</button>
        </div>
      `
          : ""
      }

      ${activityHtml}
    `;
  }

  /* ===============================
     TASKS
  =============================== */
  if (page === "tasks") {
    if (!project) {
      view.innerHTML = "<p>Please create or select a project.</p>";
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const visibleTasks = tasks.filter(t =>
      t.projectId === project.id &&
      (user.role === "builder" || t.assignedTo === user.role)
    );

    view.innerHTML = `
      <div class="card">
        <h2>Tasks</h2>

        ${
          user.role === "builder"
            ? `
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

          <input id="taskStart" type="date" class="input">
          <input id="taskEnd" type="date" class="input">

          <button class="btn-primary" onclick="createTask()">Add Task</button>
          `
            : ""
        }
      </div>

      ${visibleTasks.map(t => `
        <div class="card">
          <strong>${t.title}</strong><br>
          <small>${t.type}</small><br><br>

          Status:
          <select id="status-${t.id}">
            ${["To Do","In Progress","Blocked","Paused","Done"]
              .map(s => `<option ${t.status === s ? "selected" : ""}>${s}</option>`)
              .join("")}
          </select>

          ${
            t.status === "Blocked" || t.status === "Paused"
              ? `<input id="reason-${t.id}" class="input" placeholder="Reason" value="${t.reason || ""}">`
              : ""
          }

          <button onclick="updateTaskStatus('${t.id}')">Update</button>

          ${
            user.role === "contractor"
              ? `<button onclick="createRFI('${t.id}', prompt('Enter RFI'))">Create RFI</button>`
              : ""
          }
        </div>
      `).join("")}
    `;
  }

  /* ===============================
     GANTT
  =============================== */
  if (page === "gantt") {
    renderGantt();
  }

  /* ===============================
     CALENDAR / TO-DO
  =============================== */
  if (page === "calendar") {
    renderCalendar();
  }

  /* ===============================
     RFIs
  =============================== */
  if (page === "rfis") {
    if (!project) return;

    const rfis = JSON.parse(localStorage.getItem("rfis"))
      .filter(r => r.projectId === project.id);

    view.innerHTML = `
      <div class="card">
        <h2>RFIs</h2>

        ${rfis.map(r => `
          <div class="card">
            <strong>${r.question}</strong><br>
            Status: <span class="badge status-${r.status.toLowerCase()}">${r.status}</span><br><br>

            ${
              user.role === "builder" && r.status === "Open"
                ? `
                <input id="answer-${r.id}" class="input" placeholder="Answer">
                <button onclick="answerRFI('${r.id}', document.getElementById('answer-${r.id}').value)">Answer</button>
                <button onclick="closeRFI('${r.id}')">Close</button>
                `
                : ""
            }

            ${
              r.answer
                ? `<p><strong>Answer:</strong> ${r.answer}</p>`
                : ""
            }
          </div>
        `).join("")}
      </div>
    `;
  }

  /* ===============================
     BUDGET
  =============================== */
  if (page === "budget") {
    if (!project) return;

    const budget = getBudget(project.id);

    view.innerHTML = `
      <div class="card">
        <h2>Budget</h2>
        <p>Original: $${budget.original}</p>
        <p>Changes: $${budget.changes}</p>
        <p><strong>Current: $${budget.current}</strong></p>
      </div>
    `;
  }

  /* ===============================
     TEAM
  =============================== */
  if (page === "team") {
    const users = JSON.parse(localStorage.getItem("users"));

    view.innerHTML = `
      <div class="card">
        <h2>Team</h2>
        ${users.map(u => `
          <div>${u.name} – ${u.role}</div>
        `).join("")}
      </div>
    `;
  }
}
