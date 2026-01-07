if (!localStorage.getItem("activity")) {
  localStorage.setItem("activity", JSON.stringify([]));
}

function logActivity(projectId, message) {
  const activity = JSON.parse(localStorage.getItem("activity"));
  activity.unshift({
    id: crypto.randomUUID(),
    projectId,
    message,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem("activity", JSON.stringify(activity));
}

function getProjectActivity(projectId) {
  return JSON.parse(localStorage.getItem("activity"))
    .filter(a => a.projectId === projectId)
    .slice(0, 10);
}
