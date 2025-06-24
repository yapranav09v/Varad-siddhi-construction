import './styles/form.css';

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // Dummy authentication logic
  if (username === "admin" && password === "builder2024") {
    message.style.color = "green";
    message.textContent = "Login successful!";
    // Redirect to dashboard or other page
    // window.location.href = "dashboard.html";
  } else {
    message.style.color = "red";
    message.textContent = "Invalid username or password.";
  }
});
