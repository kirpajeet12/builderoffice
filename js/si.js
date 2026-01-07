if (!localStorage.getItem("sis")) {
  localStorage.setItem("sis", JSON.stringify([]));
}

function createSI(taskId, instruction, cost, days) {
  const project = getActiveProject();
  const sis = JSON.parse(localStorage.getItem("sis"));

  sis.push({
    id: crypto.randomUUID(),
    projectId: project.id,
    taskId,
    instruction,
    costImpact: Number(cost),
    daysImpact: Number(days),
    createdAt: new Date().toISOString()
  });

  localStorage.setItem("sis", JSON.stringify(sis));

  applyBudgetChange(project.id, cost);
  logActivity(project.id, `SI issued (+$${cost}, +${days} days)`);
}
