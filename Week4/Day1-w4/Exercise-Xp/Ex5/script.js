document.getElementById("Ex5").textContent = "Exercise 5"

// 🌟 Exercise 5 : Kg and grams

// Create a function that receives a weight in kilograms 
// and returns it in grams. (Hint: 1 kg is 1000gr)

// 1- First, use function declaration and invoke it.
function weight(kg) {
    return kg * 1000
}
// 2- Then, use function expression and invoke it.
const weight2 = function(kg){
    return kg * 1000
}



// 3- Write in a one line comment, the difference between function declaration 
// and function expression.?
// answer is : Function declarations are hoisted, function expressions are not.

//4-  Finally, use a one line arrow function and invoke it.
const weight3 = (kg)=>  kg * 1000


console.log(`1- invokes the funcion declaration ${weight(2)}`)
console.log(`2- invokes the funcion Expression ${weight2(4)}`)
console.log(`3- invokes the arrow function ${weight3(6)}`)






