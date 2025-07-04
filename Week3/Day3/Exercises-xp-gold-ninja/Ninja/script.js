// 🌟 Exercise 1 : Random Number
console.log("Q1-----------")
const randomNum = Math.floor(Math.random() * 100) + 1;
console.log("Random number:", randomNum);
for (let i = 0; i <= randomNum; i++) {
  if (i % 2 === 0) console.log(i);
}

// 🌟 Exercise 2 : Capitalized letters
console.log("Q2-----------")

function capitalize(str) {
  let even = "";
  let odd = "";
  for (let i = 0; i < str.length; i++) {
    even += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
    odd += i % 2 !== 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }
  return [even, odd];
}
console.log(capitalize("abcdef")); 

// 🌟 Exercise 3 : Is palindrome?
console.log("Q3-----------")

function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}
console.log(isPalindrome("madam")); 
console.log(isPalindrome("hello")); 

// 🌟 Exercise 4 : Biggest Number
console.log("Q4-----------")

function biggestNumberInArray(arr) {
  const nums = arr.filter(x => typeof x === "number");
  if (nums.length === 0) return 0;
  return Math.max(...nums);
}
console.log(biggestNumberInArray([-1,0,3,100,99,2,99])); 
console.log(biggestNumberInArray(['a', 3, 4, 2])); 
console.log(biggestNumberInArray([])); 

// 🌟 Exercise 5 : Unique Elements
console.log("Q5-----------")

function uniqueElements(arr) {
  return [...new Set(arr)];
}
console.log(uniqueElements([1,2,3,3,3,3,4,5])); 

// 🌟 Exercise 6 : Calendar
console.log("Q6-----------")

function createCalendar(year, month) {
  const calendarDiv = document.getElementById("calendar");
  const table = document.createElement("table");

  const days = ['MO','TU','WE','TH','FR','SA','SU'];
  const header = document.createElement("tr");
  days.forEach(day => {
    const th = document.createElement("th");
    th.textContent = day;
    header.appendChild(th);
  });
  table.appendChild(header);

  const firstDay = new Date(year, month - 1, 1);
  let currentDay = new Date(year, month - 1, 1);
  let lastDay = new Date(year, month, 0).getDate();
  
  let startDay = (firstDay.getDay() + 6) % 7; 
  let tr = document.createElement("tr");

  for (let i = 0; i < startDay; i++) {
    const td = document.createElement("td");
    td.textContent = ".";
    tr.appendChild(td);
  }

  for (let day = 1; day <= lastDay; day++) {
    if ((startDay + day - 1) % 7 === 0 && day !== 1) {
      table.appendChild(tr);
      tr = document.createElement("tr");
    }
    const td = document.createElement("td");
    td.textContent = day;
    tr.appendChild(td);
  }

  if (tr.children.length > 0) {
    while (tr.children.length < 7) {
      const td = document.createElement("td");
      td.textContent = ".";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  calendarDiv.appendChild(table);
}

createCalendar(2012, 9);
