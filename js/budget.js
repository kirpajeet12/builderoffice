if (!localStorage.getItem("budgets")) {
  localStorage.setItem("budgets", JSON.stringify([]));
}

function initBudget(project) {
  const budgets = JSON.parse(localStorage.getItem("budgets"));
  if (!budgets.find(b => b.projectId === project.id)) {
    budgets.push({
      projectId: project.id,
      original: project.budget,
      changes: 0,
      current: project.budget
    });
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }
}

function applyBudgetChange(projectId, amount) {
  const budgets = JSON.parse(localStorage.getItem("budgets"));
  const budget = budgets.find(b => b.projectId === projectId);
  budget.changes += Number(amount);
  budget.current = budget.original + budget.changes;
  localStorage.setItem("budgets", JSON.stringify(budgets));
}

function getBudget(projectId) {
  return JSON.parse(localStorage.getItem("budgets"))
    .find(b => b.projectId === projectId);
}
