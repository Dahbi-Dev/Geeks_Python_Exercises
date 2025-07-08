// 🌟 Exercise 2 : Ternary operator
document.getElementById("Ex2").textContent = "Exercise XP 2"



// 1-Transform the winBattle() function to an arrow function.
const winBattle = () => {
    return true;
}

let experiencePoints = `${winBattle() ? 10 : 1 }`
// 2-Create a variable called experiencePoints.
// 3-Assign to this variable, a ternary operator. If winBattle() is true, 
// the experiencePoints variable should be equal to 10, 
// else the variable should be equal to 1.
// 4-Console.log the experiencePoints variable.

console.log(`experiencePoints is : ${experiencePoints}`)
const ex = document.getElementById("input-res").textContent = `Eperience Points is ${experiencePoints}` 

