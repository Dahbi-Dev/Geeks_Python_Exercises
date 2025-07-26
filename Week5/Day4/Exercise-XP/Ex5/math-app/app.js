const _ = require('lodash');
const math = require('./math');

// Use custom math functions
const sum = math.add(10, 5);
const product = math.multiply(4, 3);

// Use lodash utility functions
const numbers = [10, 5, 4, 3];
const max = _.max(numbers);
const min = _.min(numbers);

console.log(`Sum: ${sum}`);
console.log(`Product: ${product}`);
console.log(`Max: ${max}`);
console.log(`Min: ${min}`);
