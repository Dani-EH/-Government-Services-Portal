document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcomeMessage = document.getElementById("welcome-message");

  if (user && user.first_name) {
    welcomeMessage.textContent = `Welcome, ${user.first_name}!`;
  } else {
    welcomeMessage.textContent = "Welcome!";
  }
});