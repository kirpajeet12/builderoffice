if (!localStorage.getItem("projects")) {
  localStorage.setItem("projects", JSON.stringify([]));
}

if (!localStorage.getItem("activeProject")) {
  localStorage.setItem("activeProject", null);
}

function createProject() {
  const name = document.getElementById("projectName").value;
  const budget = document.getElementById("projectBudget").value;

  if (!name || !budget) {
    alert("Project name & budget required");
    return;
  }

  const projects = JSON.parse(localStorage.getItem("projects"));

  const project = {
    id: crypto.randomUUID(),
    name,
    budget: Number(budget),
    status: "Active"
  };

  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("activeProject", project.id);

  route("dashboard");
}

function getActiveProject() {
  const id = localStorage.getItem("activeProject");
  if (!id) return null;

  return JSON.parse(localStorage.getItem("projects"))
    .find(p => p.id === id);
}
