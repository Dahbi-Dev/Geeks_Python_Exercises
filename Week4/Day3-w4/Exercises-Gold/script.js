// Exercise 1
// Destructuring directly in function parameters for clean code
function printFullName({ first, last }) {
  return `Your full name is ${first} ${last}`;
}

console.log(printFullName({ first: 'Elie', last: 'Schoppik' }));


// Exercise 2
// Convert object to sorted keys array, then map values in same order
function keysAndValues(obj) {
  const keys = Object.keys(obj).sort(); // sort keys alphabetically
  const values = keys.map(key => obj[key]); // keep values in same key order
  return [keys, values];
}

console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
console.log(keysAndValues({ key1: true, key2: false, key3: undefined }));


// Exercise 3
// counterOne and counterTwo point to same object, so count is shared
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment(); // count = 1
counterOne.increment(); // count = 2

const counterTwo = counterOne; // same reference
counterTwo.increment(); // count = 3 for both

console.log(counterOne.count); // output: 3
