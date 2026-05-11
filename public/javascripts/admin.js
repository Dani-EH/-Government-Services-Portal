// public/javascripts/admin.js

let allRequests = [];
let allUsers = [];

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || user.role !== "admin") {
    window.location.href = "/login";
    return;
  }

  // Setup logout button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    });
  }

  loadInitialData(token);
});

async function loadInitialData(token) {
  await Promise.all([
    loadAllRequests(token),
    loadAllUsers(token)
  ]);
  updateStats();
}

function showSection(sectionId) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(sectionId));
  });

  // Update sections
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.toggle('active', section.id === `${sectionId}-section`);
  });
}

function updateStats() {
  document.getElementById('stat-total-requests').textContent = allRequests.length;
  document.getElementById('stat-pending-requests').textContent = allRequests.filter(r => r.status.toLowerCase() === 'pending').length;
  document.getElementById('stat-total-users').textContent = allUsers.length;
}

async function loadAllRequests(token) {
  const tableBody = document.getElementById("requests-tbody");
  const requestCount = document.getElementById("request-count");

  try {
    const res = await fetch(`${API_BASE}/requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(`Failed to fetch requests: ${res.status}`);

    allRequests = await res.json();
    renderRequests(allRequests);
  } catch (err) {
    console.error("Error loading requests:", err);
    tableBody.innerHTML = `<tr><td colspan="6" class="empty-state" style="color:red;">Failed to load requests</td></tr>`;
  }
}

function renderRequests(requests) {
  const tableBody = document.getElementById("requests-tbody");
  const requestCount = document.getElementById("request-count");
  
  tableBody.innerHTML = "";
  requestCount.textContent = `Total: ${requests.length} requests`;

  if (requests.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="empty-state">No matching requests found</td></tr>`;
    return;
  }

  requests.forEach((req) => {
    const clientName = req.User ? `${req.User.first_name} ${req.User.last_name}` : "Unknown Client";
    const serviceName = req.Service ? req.Service.name : "Unknown Service";
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${req.id}</td>
      <td>${clientName}</td>
      <td>${serviceName}</td>
      <td>${req.date_requested}</td>
      <td><span class="status ${req.status.toLowerCase()}">${req.status}</span></td>
      <td>
        <div class="action-cell">
          <select class="status-select" id="status-${req.id}">
            <option value="pending" ${req.status.toLowerCase() === "pending" ? "selected" : ""}>Pending</option>
            <option value="underway" ${req.status.toLowerCase() === "underway" ? "selected" : ""}>Underway</option>
            <option value="done" ${req.status.toLowerCase() === "done" ? "selected" : ""}>Done</option>
          </select>
          <button class="update-btn" onclick="updateRequestStatus(${req.id})">Update</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

async function loadAllUsers(token) {
  const tableBody = document.getElementById("users-tbody");
  const userCount = document.getElementById("user-count");

  try {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);

    allUsers = await res.json();
    renderUsers(allUsers);
  } catch (err) {
    console.error("Error loading users:", err);
    tableBody.innerHTML = `<tr><td colspan="5" class="empty-state" style="color:red;">Failed to load users</td></tr>`;
  }
}

function renderUsers(users) {
  const tableBody = document.getElementById("users-tbody");
  const userCount = document.getElementById("user-count");

  tableBody.innerHTML = "";
  userCount.textContent = `Total: ${users.length} users`;

  if (users.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="empty-state">No matching users found</td></tr>`;
    return;
  }

  users.forEach((u) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.id}</td>
      <td>${u.first_name} ${u.last_name}</td>
      <td>${u.email}</td>
      <td><span class="status ${u.role}">${u.role}</span></td>
      <td>
        <div class="action-cell">
          <select class="status-select" id="role-${u.id}">
            <option value="client" ${u.role === "client" ? "selected" : ""}>Client</option>
            <option value="employee" ${u.role === "employee" ? "selected" : ""}>Employee</option>
            <option value="admin" ${u.role === "admin" ? "selected" : ""}>Admin</option>
          </select>
          <button class="update-btn" onclick="updateUserRole(${u.id})">Update Role</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function filterRequests() {
  const searchTerm = document.getElementById('request-search').value.toLowerCase();
  const statusFilter = document.getElementById('request-status-filter').value;

  const filtered = allRequests.filter(r => {
    const clientName = r.User ? `${r.User.first_name} ${r.User.last_name}`.toLowerCase() : "";
    const serviceName = r.Service ? r.Service.name.toLowerCase() : "";
    const matchesSearch = r.id.toString().includes(searchTerm) || clientName.includes(searchTerm) || serviceName.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || r.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  renderRequests(filtered);
}

function filterUsers() {
  const searchTerm = document.getElementById('user-search').value.toLowerCase();

  const filtered = allUsers.filter(u => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    return u.id.toString().includes(searchTerm) || 
           fullName.includes(searchTerm) || 
           u.email.toLowerCase().includes(searchTerm) || 
           u.role.toLowerCase().includes(searchTerm);
  });

  renderUsers(filtered);
}

async function updateRequestStatus(requestId) {
  const token = localStorage.getItem("token");
  const selectElement = document.getElementById(`status-${requestId}`);
  const newStatus = selectElement.value;

  try {
    const res = await fetch(`${API_BASE}/requests/${requestId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      alert(`✅ Status updated to ${newStatus}`);
      loadAllRequests(token).then(() => updateStats());
    } else {
      const data = await res.json();
      alert(`❌ ${data.error || data.message || "Could not update status"}`);
    }
  } catch (err) {
    console.error("Error updating request:", err);
    alert("⚠️ Server error");
  }
}

async function updateUserRole(userId) {
  const token = localStorage.getItem("token");
  const selectElement = document.getElementById(`role-${userId}`);
  const newRole = selectElement.value;

  if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

  try {
    const res = await fetch(`${API_BASE}/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role: newRole })
    });

    if (res.ok) {
      alert(`✅ User role updated to ${newRole}`);
      loadAllUsers(token).then(() => updateStats());
    } else {
      const data = await res.json();
      alert(`❌ ${data.error || data.message || "Could not update role"}`);
    }
  } catch (err) {
    console.error("Error updating user role:", err);
    alert("⚠️ Server error");
  }
}