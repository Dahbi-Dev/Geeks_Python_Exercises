document.title = "Exercise 3";
document.getElementById("Ex3").textContent = "Exercise XP 3"


// 🌟 Exercise 3 : Is it a string ?

// Write a JavaScript arrow function 
// that checks whether the value of the argument passed,
//  is a string or not. The function should return true or false
// Check out the example below to see the expected output

const is_string = (word) => {
    if (typeof word === "string") {
        return true
        
    } else {
        return false
    }
}

const is_it = is_string(5)
console.log(is_it)
document.getElementById("is").textContent = is_it