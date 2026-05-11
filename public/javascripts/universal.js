const API_BASE = "http://localhost:3000/api";

const ROUTES = {
  login: "/login",
  signup: "/signup",
  register: "/register",
  client: "/client",
  services: "/services",
  personal: "/personal",
  employee: "/employee",
  admin: "/admin",
};

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function requireLogin() {
  const user = getUser();

  if (!user) {
    alert("Please log in first.");
    window.location.href = ROUTES.login;
  }

  return user;
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = ROUTES.login;
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  const overlay = document.getElementById("supportOverlay");
  const openBtn = document.getElementById("supportBtn");
  const closeBtn = document.getElementById("closeOverlay");

  if (overlay && openBtn && closeBtn) {
    openBtn.onclick = () => {
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    };

    closeBtn.onclick = () => {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    };

    window.onclick = (event) => {
      if (event.target === overlay) {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
      }
    };
  }
});