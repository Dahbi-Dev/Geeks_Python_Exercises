// Exercise 1: Sum elements
// Write a JavaScript program to find the sum of all elements in an array.

const arr = [2,3,4,20,33]

const sum = arr.reduce((total, current)=> total+ current ,0)
console.log(sum)