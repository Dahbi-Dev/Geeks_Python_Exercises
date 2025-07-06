// Exercise 1: Timer

setTimeout(() => {
  alert("Hello World");
}, 2000);

setTimeout(() => {
  const container1 = document.getElementById("container1");
  const p = document.createElement("p");
  p.textContent = "Hello World";
  container1.appendChild(p);
}, 2000);

let intervalId = setInterval(() => {
  const container1 = document.getElementById("container1");
  const p = document.createElement("p");
  p.textContent = "Hello World";
  container1.appendChild(p);

  if (container1.querySelectorAll("p").length >= 5) {
    clearInterval(intervalId);
  }
}, 2000);

document.getElementById("clear").addEventListener("click", () => {
  clearInterval(intervalId);
});

// Exercise 2: Move the box

function myMove() {
  const elem = document.getElementById("animate");
  let pos = 0;
  const max = 400 - 50;

  const id = setInterval(() => {
    if (pos >= max) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.left = pos + "px";
    }
  }, 1);
}
