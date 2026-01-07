if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

function createTask() {
  const title = document.getElementById("taskTitle").value;
  const type = document.getElementById("taskType").value;
  const assignedTo = document.getElementById("taskAssignee").value;
  const start = document.getElementById("taskStart").value;
  const end = document.getElementById("taskEnd").value;

  if (!title || !start || !end) {
    alert("Missing task fields");
    return;
  }

  const project = getActiveProject();
  if (!project) {
    alert("No active project");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.push({
    id: crypto.randomUUID(),
    projectId: project.id,
    title,
    type,
    assignedTo,
    status: "To Do",
    reason: "",
    startDate: start,
    endDate: end
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  route("tasks");
}

function updateTaskStatus(id) {
  const status = document.getElementById(`status-${id}`).value;
  const reasonField = document.getElementById(`reason-${id}`);
  const reason = reasonField ? reasonField.value : "";

  if ((status === "Blocked" || status === "Paused") && !reason) {
    alert("Reason required");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find(t => t.id === id);

  task.status = status;
  task.reason = reason;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  route("tasks");
}
