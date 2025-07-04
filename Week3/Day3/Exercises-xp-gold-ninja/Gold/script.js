// 🌟 Exercise 1 : is_Blank
console.log("Q1--------------")
function isBlank(str) {
  return str.trim() === '';
}
console.log(isBlank(''));       
console.log(isBlank('abc'));    

// 🌟 Exercise 2 : Abbrev_name
console.log("Q2--------------")
function abbrevName(name) {
  const [first, last] = name.split(" ");
  return `${first} ${last[0]}.`;
}
console.log(abbrevName("Robin Singh")); 

// 🌟 Exercise 3 : SwapCase
console.log("Q3--------------")

function swapCase(str) {
  return str.split('').map(char => {
    if (char === char.toUpperCase()) return char.toLowerCase();
    else return char.toUpperCase();
  }).join('');
}
console.log(swapCase('The Quick Brown Fox')); 

// 🌟 Exercise 4 : Omnipresent value
console.log("Q4--------------")

function isOmnipresent(arr, val) {
  return arr.every(subArr => subArr.includes(val));
}
console.log(isOmnipresent([[1,1], [1,3], [5,1], [6,1]], 1)); 
console.log(isOmnipresent([[1,1], [1,3], [5,1], [6,1]], 6)); 

// 🌟 Exercise 5 : Red Table
console.log("Q5------html--------")

let table = document.querySelector("table");
for (let i = 0; i < table.rows.length; i++) {
  table.rows[i].cells[i].style.backgroundColor = "red";
}