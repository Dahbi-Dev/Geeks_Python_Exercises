// Exercise 2 : Remove Duplicates
// Write a JavaScript program to remove duplicate items in an array.

const arr = [1, 2, 2, 3, 4, 4, 5,5];


const removeDuplicates = [...new Set(arr)]

console.log(removeDuplicates)
