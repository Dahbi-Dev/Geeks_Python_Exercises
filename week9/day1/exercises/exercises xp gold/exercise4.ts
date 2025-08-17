function welcomeUser(name: string, greeting?: string): string {
    if (!greeting) {
        greeting = "Hello"; 
    }
    return `${greeting}, ${name}!`;
}


console.log(welcomeUser("Alice")); // "Hello, Alice!"
console.log(welcomeUser("Bob", "Welcome")); // "Welcome, Bob!"