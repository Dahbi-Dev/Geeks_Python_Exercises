
// 🌟 Exercise 4 : Vacations Costs
function hotelCost(nights) {
    return 140 * nights;
}
function planeRideCost(destination) {
    if (destination.toLowerCase() === "london") return 183;
    if (destination.toLowerCase() === "paris") return 220;
    return 300;
}
function rentalCarCost(days) {
    let total = 40 * days;
    if (days > 10) {
        total *= 0.95;
    }
    return total;
}
function totalVacationCost() {
    const nights = parseInt(prompt("How many nights in the hotel?"));
    const destination = prompt("What is your destination?");
    const days = parseInt(prompt("How many days will you rent a car?"));
    const hotel = hotelCost(nights);
    const plane = planeRideCost(destination);
    const car = rentalCarCost(days);
    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}`);
    return hotel + plane + car;
}
// totalVacationCost(); // Uncomment to use in browser

// 🌟 Exercise 5 : Users
const div = document.getElementById("container");
console.log(div);
document.querySelectorAll("ul.list")[0].children[1].textContent = "Richard";
document.querySelectorAll("ul.list")[1].children[1].remove();
document.querySelectorAll("ul.list").forEach(ul => {
    ul.children[0].textContent = "Houssam";
});
document.querySelectorAll("ul.list").forEach(ul => ul.classList.add("student_list"));
document.querySelectorAll("ul.list")[0].classList.add("university", "attendance");
div.style.backgroundColor = "lightblue";
div.style.padding = "10px";
document.querySelectorAll("ul.list")[1].lastElementChild.style.display = "none";
document.querySelectorAll("ul.list")[0].children[1].style.border = "2px solid black";
document.body.style.fontSize = "20px";
if (div.style.backgroundColor === "lightblue") {
    const names = Array.from(document.querySelectorAll("ul.list")[0].children).map(li => li.textContent);
    alert(`Hello ${names.join(" and ")}`);
}

// 🌟 Exercise 6 : Change the navbar
const navBar = document.getElementById("navBar");
navBar.setAttribute("id", "socialNetworkNavigation");
const ul = navBar.querySelector("ul");
const li = document.createElement("li");
const text = document.createTextNode("Logout");
li.appendChild(text);
ul.appendChild(li);
console.log(ul.firstElementChild.textContent);
console.log(ul.lastElementChild.textContent);

// 🌟 Exercise 7 : My Book List
const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://picsum.photos/200/300",
        alreadyRead: true
    },
    {
        title: "1984",
        author: "George Orwell",
        image: "https://picsum.photos/200/300",
        alreadyRead: false
    }
];
const section = document.querySelector(".listBooks");
allBooks.forEach(book => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = `${book.title} written by ${book.author}`;
    if (book.alreadyRead) {
        p.style.color = "red";
    }
    const img = document.createElement("img");
    img.src = book.image;
    img.style.width = "100px";
    div.appendChild(p);
    div.appendChild(img);
    section.appendChild(div);
});
