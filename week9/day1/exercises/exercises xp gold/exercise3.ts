
type AdvancedUser = {
    name: string;
    age: number;
    address?: string; 
};

function introduceAdvancedUser(user: AdvancedUser): string {
    let greeting = `Hello, my name is ${user.name} and I am ${user.age} years old.`;
    if (user.address) {
        greeting += ` I live at ${user.address}.`;
    }
    return greeting;
}

const user1: AdvancedUser = {
    name: "Alice",
    age: 30,
    address: "123 Main St"
};

const user2: AdvancedUser = {
    name: "Bob",
    age: 25
};  

console.log(introduceAdvancedUser(user1)); 
console.log(introduceAdvancedUser(user2));
