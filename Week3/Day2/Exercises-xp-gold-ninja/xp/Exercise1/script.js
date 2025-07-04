// 🌟 Exercise 1 : List of people
// Instructions
const people = ["Greg", "Mary", "Devon", "James"];

// Part I - Review about arrays
// 1-Write code to remove “Greg” from the people array.
people.splice(people.indexOf("Greg"), 1);
console.log("Q1",people)

// 2-Write code to replace “James” to “Jason”.
const replaced = people.splice(3,1,"Jason")
console.log("Q2",people)

// 3-Write code to add your name to the end of the people array.
people.push("Houssam");
console.log("Q3",people)


// 4-Write code that console.logs Mary’s index. take a look at the indexOf method on Google.
console.log("Q4",people.indexOf('Mary'))

// 5-Write code to make a copy of the people array using the slice method.
// The copy should NOT include “Mary” or your name.
// Hint: remember that now the people array should look like this const people = ["Mary", "Devon", "Jason", "Yourname"];
// Hint: Check out the documentation for the slice method
const deleted_people = people.slice(1,-1)
console.log("Q5",deleted_people)

// 6-Write code that gives the index of “Foo”. Why does it return -1 ?
console.log("Q6",people.indexOf("Foo")) // it return -1 because the "Foo" is not in the array

// 7-Create a variable called last which value is the last element of the array.
// Hint: What is the relationship between the index of the last element in the array and the length of the array?
const last = people.pop(-1)
console.log("Q7",last) 


// Part II - Loops
// 1-Using a loop, iterate through the people array and console.log each person.
console.log("Part II ")
console.log("Q1")
for (const person of people) {
    console.log(person)
}
// 2-Using a loop, iterate through the people array and exit the loop after you console.log “Devon” .
// Hint: take a look at the break statement in the lesson.

console.log("Q2:")
for(const person of people){
   console.log(person)
   if(person == "Devon"){
    console.log("Devon Found")
    break
   }
}