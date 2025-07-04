//  🌟 Exercise 3 : Repeat the question
// Instructions
// 1- Prompt the user for a number.
// Hint : Check the data type you receive from the prompt (ie. Use the typeof method)
let number = Number(prompt("please enter number ? :"));
console.log(typeof(number))





// 2- While the number is smaller than 10 continue asking the user for a new number.
// Tip : Which while loop is more relevant for this situation?

while (number < 10 && number != 0 ) {
    number = Number(prompt("Number is less than 10, please enter a new number:"));
    console.log(typeof(number))
  
}
alert('You Enter the Wrong Number ')