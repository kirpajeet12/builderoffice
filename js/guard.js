const session = JSON.parse(localStorage.getItem("session"));

if (!session) {
  window.location.href = "index.html";
}
