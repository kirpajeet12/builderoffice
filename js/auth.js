function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!name || !email || !password) {
    alert("All fields required");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users"));

  if (users.find(u => u.email === email)) {
    alert("User already exists");
    return;
  }

  users.push({
    id: crypto.randomUUID(),
    name,
    email,
    password, // ⚠️ plain text (OK for MVP only)
    role
  });

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "index.html";
}

function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("session", JSON.stringify(user));
  window.location.href = "app.html";
}

function logout() {
  localStorage.setItem("session", JSON.stringify(null));
  window.location.href = "index.html";
}
