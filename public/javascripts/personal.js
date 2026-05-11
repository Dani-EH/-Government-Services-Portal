const user = requireLogin();

async function loadPersonalInfo() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const data = await res.json();

  document.getElementById("fname").value = data.first_name;
  document.getElementById("lname").value = data.last_name;
  document.getElementById("dob").value = data.dob;
  document.getElementById("pob").value = data.pob;
  document.getElementById("email").value = data.email;
  document.getElementById("phone").value = data.phone;
}

async function updatePersonalInfo(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const payload = {
    first_name: document.getElementById("fname").value,
    last_name: document.getElementById("lname").value,
    dob: document.getElementById("dob").value,
    pob: document.getElementById("pob").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
  };

  const res = await fetch(`${API_BASE}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("✅ Information updated successfully");
  } else {
    const err = await res.json();
    alert(`❌ Error: ${err.message || "Could not update information"}`);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadPersonalInfo();
  const form = document.querySelector(".client-info-form");
  if (form) {
    form.addEventListener("submit", updatePersonalInfo);
  }
});