const paragraph  = document.createElement("p")
const div = document.getElementById("container")

const epic = ["a", "long", "time", "ago", "in a", "galaxy", "far far", "away"];

const final = epic.reduce((acc,words) => acc + ' ' + words)
console.log(final)
paragraph.textContent = final
div.appendChild(paragraph)