// login.js

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector('input[name="Username"]').value.trim();
  const password = document.querySelector('input[name="Password"]').value;

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ 
      username, 
      password 
    })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "admin") {
      window.location.href = "/admin";
    } else if (data.user.role === "employee") {
      window.location.href = "/employee";
    } else {
      window.location.href = "/client";
    }
  } else {
    alert("❌ Login failed: " + (data.error || data.message || "Invalid username or password"));
  }
});