document.getElementById("Ex4").textContent = "Exercise 4"
// 🌟 Exercise 4 : Find the sum

const findSum = (num1, num2) => {
    return num1 + num2
}

const sum = findSum(100,900);
console.log(sum)




//this is hwo to create element and show it in html
const new_ele = document.createElement("h3")
new_ele.style.textDecoration = "underline";
new_ele.textContent = sum
document.body.appendChild(new_ele)
