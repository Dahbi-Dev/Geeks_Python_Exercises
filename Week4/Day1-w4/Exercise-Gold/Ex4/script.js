const curriedSum = (a) => (b) => a + b
const add5 = curriedSum(5)
// add5 is now (b) => 5 + b
console.log(add5(12))
// calls add5 with 12 → 5 + 12 = 17

