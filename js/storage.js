// Initialize fake database
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

if (!localStorage.getItem("session")) {
  localStorage.setItem("session", JSON.stringify(null));
}
