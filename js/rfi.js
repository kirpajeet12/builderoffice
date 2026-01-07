if (!localStorage.getItem("rfis")) {
  localStorage.setItem("rfis", JSON.stringify([]));
}

function createRFI(taskId, question) {
  const project = getActiveProject();
  const user = JSON.parse(localStorage.getItem("session"));

  const rfis = JSON.parse(localStorage.getItem("rfis"));
  rfis.push({
    id: crypto.randomUUID(),
    projectId: project.id,
    taskId,
    question,
    status: "Open",
    answer: "",
    createdBy: user.name,
    createdAt: new Date().toISOString()
  });

  // Auto-block task
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find(t => t.id === taskId);
  task.status = "Blocked";
  task.reason = "RFI Open";

  localStorage.setItem("rfis", JSON.stringify(rfis));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  logActivity(project.id, `RFI created for task "${task.title}"`);
}

function answerRFI(id, answer) {
  const rfis = JSON.parse(localStorage.getItem("rfis"));
  const rfi = rfis.find(r => r.id === id);

  rfi.answer = answer;
  rfi.status = "Answered";

  localStorage.setItem("rfis", JSON.stringify(rfis));
  logActivity(rfi.projectId, "RFI answered");
}

function closeRFI(id) {
  const rfis = JSON.parse(localStorage.getItem("rfis"));
  const rfi = rfis.find(r => r.id === id);
  rfi.status = "Closed";

  // Unblock task
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find(t => t.id === rfi.taskId);
  task.status = "In Progress";
  task.reason = "";

  localStorage.setItem("rfis", JSON.stringify(rfis));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  logActivity(rfi.projectId, "RFI closed");
}
