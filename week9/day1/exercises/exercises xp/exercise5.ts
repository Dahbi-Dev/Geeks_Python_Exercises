function getDetails(name: string, age: number): [string, number, string] {
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    return [name, age, greeting];
}

const details = getDetails("Alice", 25);
console.log(details);
console.log("Name:", details[0]);
console.log("Age:", details[1]);
console.log("Greeting:", details[2]);

const otherDetails = getDetails("Bob", 30);
console.log(otherDetails);
