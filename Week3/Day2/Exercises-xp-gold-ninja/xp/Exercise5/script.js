// Q1- Create an object called family with a few key value pairs.
const family = {
	father: "John",
	mother: "Jane",
	child: "Jimmy"
}
//Q2-  Using a for in loop, console.log the keys of the object.
console.log('Q2')
for(let fam in family){
	console.log(fam);
}
//Q3-  Using a for in loop, console.log the values of the object.
console.log('Q3')
for(let fam in family){
	console.log(family[fam]);
}
