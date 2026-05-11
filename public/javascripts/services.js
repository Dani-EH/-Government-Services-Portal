// public/js/services.js
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "/login";
    return;
  }

  // Load services from database and display them
  loadServices();

  // Load user's requested services
  loadUserRequests(user.id);
});

// 🧩 Function to load services from the database and render cards
async function loadServices() {
  const container = document.getElementById("services-container");
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE}/services`);
    const services = await res.json();

    container.innerHTML = ""; // Clear existing cards

    if (!services || services.length === 0) {
      container.innerHTML = `<p style="text-align:center;">No services available</p>`;
      return;
    }

    services.forEach((service) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h2>${service.name}</h2>
        <p>${service.description}</p>
        <button class="request-btn" data-service-id="${service.id}">Request Service</button>
      `;
      container.appendChild(card);
    });

    // Attach event listeners to all request buttons
    const requestButtons = document.querySelectorAll(".request-btn");
    const user = JSON.parse(localStorage.getItem("user"));
    
    requestButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const serviceId = btn.dataset.serviceId;
        const token = localStorage.getItem("token");
        try {
          const res = await fetch(`${API_BASE}/requests`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              service_id: parseInt(serviceId),
            }),
          });

          const data = await res.json();
          if (res.ok) {
            alert(`✅ Request submitted`);
            loadUserRequests(user.id); // refresh list instantly
          } else {
            alert(`❌ ${data.error || "Could not create request"}`);
          }
        } catch (err) {
          console.error("Error:", err);
          alert("⚠️ Server error, please try again later.");
        }
      });
    });
  } catch (err) {
    console.error("Error loading services:", err);
    container.innerHTML = `<p style="text-align:center; color:red;">Failed to load services</p>`;
  }
}

// 🧩 Function to load the user's requests and show them in the table
async function loadUserRequests(userId) {
  const tableBody = document.querySelector(".requests-table tbody");
  if (!tableBody) return;

  try {
    const res = await fetch(`${API_BASE}/requests/my`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    const requests = await res.json();

    tableBody.innerHTML = "";

    if (requests.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No requests yet</td></tr>`;
      return;
    }

    requests.forEach((r) => {
      const serviceName = r.Service ? r.Service.name : "Unknown Service";
      const row = `
        <tr>
          <td>${serviceName}</td>
          <td>${r.date_requested}</td>
          <td><span class="status ${r.status.toLowerCase()}">${r.status}</span></td>
          <td>${r.id}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  } catch (err) {
    console.error("Error loading user requests:", err);
  }
}