const user = requireLogin();
let allRequests = [];

async function loadRequests() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/requests`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  allRequests = await res.json();
  renderRequests(allRequests);
}

function renderRequests(requests) {
  const tbody = document.querySelector(".requests-table tbody");
  tbody.innerHTML = "";

  if (requests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">No matching requests found.</td></tr>`;
    return;
  }

  requests.forEach(r => {
    const serviceName = r.Service ? r.Service.name : (r.service_name || "N/A");
    tbody.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${r.id}</td>
        <td>${r.user_id}</td>
        <td>${serviceName}</td>
        <td>${r.date_requested}</td>
        <td><span class="status ${r.status.toLowerCase()}">${r.status}</span></td>
        <td>
          <select onchange="updateStatus(${r.id}, this.value)">
            <option value="pending" ${r.status.toLowerCase() === "pending" ? "selected" : ""}>Pending</option>
            <option value="underway" ${r.status.toLowerCase() === "underway" ? "selected" : ""}>Underway</option>
            <option value="done" ${r.status.toLowerCase() === "done" ? "selected" : ""}>Done</option>
          </select>
        </td>
      </tr>
    `);
  });
}

async function updateStatus(id, newStatus) {
  const token = localStorage.getItem("token");
  await fetch(`${API_BASE}/requests/${id}/status`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status: newStatus })
  });
  loadRequests();
}

function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const statusValue = document.getElementById("statusFilter").value;

  const filtered = allRequests.filter(r => {
    const serviceName = r.Service ? r.Service.name : (r.service_name || "");
    const matchesSearch =
      serviceName.toLowerCase().includes(searchValue) ||
      r.user_id.toString().includes(searchValue);
    const matchesStatus =
      !statusValue || r.status.toLowerCase() === statusValue.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  renderRequests(filtered);
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("welcome-message").textContent = `Welcome, ${user.first_name}`;
  loadRequests();

  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("statusFilter").addEventListener("change", applyFilters);
});