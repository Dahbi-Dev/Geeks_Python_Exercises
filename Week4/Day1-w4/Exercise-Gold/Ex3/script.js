// Exercise 3 : Currying

// Analyse the code below, and before executing it, 
// predict the outcome of the last line.


const curriedSum = (a) => (b) => a + b

console.log(curriedSum(30)(1))
// outcome will be 31 it callculate the 30 with 1