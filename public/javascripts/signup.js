document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".signup-form");
  const inputs = form.querySelectorAll("input[type='text'], input[type='date'], input[type='email'], input[type='tel'], input[type='password']");
  const checkbox = form.querySelector("input[type='checkbox']");
  const submitBtn = document.getElementById("login-btn");

  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = "gray";
  submitBtn.style.cursor = "not-allowed";

  function validateForm() {
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    const isChecked = checkbox.checked;

    if (allFilled && isChecked) {
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = "#4CAF50";
      submitBtn.style.cursor = "pointer";
    } else {
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = "gray";
      submitBtn.style.cursor = "not-allowed";
    }
  }

  inputs.forEach(input => input.addEventListener("input", validateForm));
  checkbox.addEventListener("change", validateForm);
});

document.querySelector(".signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    role: "client",
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    dob: document.getElementById("dob").value,
    pob: document.getElementById("pob").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  const data = await res.json();
  if (res.ok) {
    alert("✅ Registration successful!");
    window.location.href = "/login";
  } else {
    alert("❌ Error: " + data.error);
  }
});