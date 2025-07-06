document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("letterInput");

  input.addEventListener("input", () => {
    // Replace anything that is NOT a-z or A-Z with empty string
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
  });
});
