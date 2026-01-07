function route(page) {
  const view = document.getElementById("view");

  if (page === "dashboard") {
    view.innerHTML = `
      <div class="card">
        <h2>Dashboard</h2>
        <p>Project health, KPIs, and activity will live here.</p>
      </div>
    `;
  }

  if (page === "tasks") {
    view.innerHTML = `
      <div class="card">
        <h2>Tasks</h2>
        <p>Task list & filters will be here.</p>
      </div>
    `;
  }

  if (page === "gantt") {
    view.innerHTML = `
      <div class="card">
        <h2>Gantt</h2>
        <p>Project timeline will be here.</p>
      </div>
    `;
  }

  if (page === "calendar") {
    view.innerHTML = `
      <div class="card">
        <h2>Calendar / To-Do</h2>
        <p>Daily & weekly task planning.</p>
      </div>
    `;
  }

  if (page === "rfis") {
    view.innerHTML = `
      <div class="card">
        <h2>RFIs</h2>
        <p>Requests for information.</p>
      </div>
    `;
  }

  if (page === "budget") {
    view.innerHTML = `
      <div class="card">
        <h2>Budget</h2>
        <p>Budget tracking & SI impact.</p>
      </div>
    `;
  }

  if (page === "team") {
    view.innerHTML = `
      <div class="card">
        <h2>Team</h2>
        <p>Team members & assignments.</p>
      </div>
    `;
  }
}

// Default view
route("dashboard");
