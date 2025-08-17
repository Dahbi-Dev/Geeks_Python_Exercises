function greet(): string;
function greet(name: string): string;
function greet(name?: string): string {
    if (name === undefined) {
        return "Hello there! Welcome!";
    }
    return `Hello, ${name}! Nice to meet you!`;
}

console.log(greet());
console.log(greet("Alice"));
console.log(greet("Bob"));