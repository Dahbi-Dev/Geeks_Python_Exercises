const compose = (f, g) => (a) => f(g(a));
// compose takes two functions f and g

// returns a new function that applies g to 'a' first, 
// then f to the result

const add1 = (num) => num + 1;
// adds 1 to a number

const add5 = (num) => num + 5;
// adds 1 to a number


console.log(compose(add1, add5)(10))
// g = add5 → add5(10) = 15
// f = add1 → add1(15) = 16
