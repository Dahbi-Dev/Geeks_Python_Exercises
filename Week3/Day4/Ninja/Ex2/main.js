const form = document.getElementById("emailForm");
const emailInput = document.getElementById("emailInput");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (validateEmailWithRegex(email)) {
    message.textContent = "Valid email ✅";
    message.style.color = "green";
  } else {
    message.textContent = "Invalid email ❌";
    message.style.color = "red";
  }
});

function validateEmailWithRegex(email) {
  const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return pattern.test(email);
}
