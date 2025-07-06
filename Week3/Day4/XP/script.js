// Exercise 1
const h1 = document.querySelector("h1");
console.log(h1);

const article = document.querySelector("article");
const lastParagraph = article.lastElementChild;
article.removeChild(lastParagraph);

const h2 = document.querySelector("h2");
h2.addEventListener("click", () => {
  h2.style.backgroundColor = "red";
});

const h3 = document.querySelector("h3");
h3.addEventListener("click", () => {
  h3.style.display = "none";
});

const boldBtn = document.getElementById("boldBtn");
boldBtn.addEventListener("click", () => {
  const paragraphs = document.querySelectorAll("article p");
  paragraphs.forEach(p => {
    p.style.fontWeight = "bold";
  });
});

h1.addEventListener("mouseover", () => {
  const randomSize = Math.floor(Math.random() * 101);
  h1.style.fontSize = `${randomSize}px`;
});

const secondParagraph = document.querySelectorAll("article p")[1];
secondParagraph.addEventListener("mouseover", () => {
  secondParagraph.classList.add("fade");
});
secondParagraph.addEventListener("mouseout", () => {
  secondParagraph.classList.remove("fade");
});



// Exercise 2
const form = document.querySelector("form");
console.log(form);

const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
console.log(fnameInput, lnameInput);

const inputsByName = document.getElementsByName("firstname");
inputsByName.forEach(input => console.log(input));
const inputsByName2 = document.getElementsByName("lastname");
inputsByName2.forEach(input => console.log(input));

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const firstName = fnameInput.value.trim();
  const lastName = lnameInput.value.trim();
  if (firstName !== "" && lastName !== "") {
    const ul = document.querySelector(".usersAnswer");
    ul.innerHTML = "";
    const li1 = document.createElement("li");
    li1.textContent = firstName;
    ul.appendChild(li1);
    const li2 = document.createElement("li");
    li2.textContent = lastName;
    ul.appendChild(li2);
  }
});



// Exercise 3
let allBoldItems;

function getBoldItems() {
  const paragraph = document.getElementById("bold-paragraph");
  allBoldItems = paragraph.querySelectorAll("strong");
}
function highlight() {
  allBoldItems.forEach(item => {
    item.style.color = "blue";
  });
}
function returnItemsToDefault() {
  allBoldItems.forEach(item => {
    item.style.color = "black";
  });
}

getBoldItems();

const boldParagraph = document.getElementById("bold-paragraph");
boldParagraph.addEventListener("mouseover", highlight);
boldParagraph.addEventListener("mouseout", returnItemsToDefault);




// Exercise 4
const sphereForm = document.getElementById("MyForm");
sphereForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const radius = parseFloat(document.getElementById("radius").value);
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  document.getElementById("volume").value = volume.toFixed(2);
});
