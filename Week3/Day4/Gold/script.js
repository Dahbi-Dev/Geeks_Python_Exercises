// Exercise 1

const genresSelect = document.getElementById("genres");
const genreDisplay = document.getElementById("selectedGenreDisplay");
const showGenreButton = document.getElementById("showGenre");

const newOption = document.createElement("option");
newOption.value = "classic";
newOption.text = "Classic";
newOption.selected = true;
genresSelect.appendChild(newOption);

showGenreButton.addEventListener("click", () => {
  genreDisplay.textContent = "Selected Genre: " + genresSelect.value;
});

// Exercise 2

const removeBtn = document.getElementById("removeBtn");

removeBtn.addEventListener("click", removecolor);

function removecolor() {
  const colorSelect = document.getElementById("colorSelect");
  const selectedIndex = colorSelect.selectedIndex;
  if (selectedIndex !== -1) {
    colorSelect.remove(selectedIndex);
  }
}

// Exercise 3

let shoppingList = [];

const root = document.getElementById("root");

const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "Enter item";
input.required = true;

const addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "AddItem";

const clearButton = document.createElement("button");
clearButton.type = "button";
clearButton.textContent = "ClearAll";

const ul = document.createElement("ul");

form.appendChild(input);
form.appendChild(addButton);
root.appendChild(form);
root.appendChild(clearButton);
root.appendChild(ul);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addItem(input.value);
  input.value = "";
});

clearButton.addEventListener("click", clearAll);

function addItem(item) {
  shoppingList.push(item);
  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
}

function clearAll() {
  shoppingList = [];
  ul.innerHTML = "";
}
