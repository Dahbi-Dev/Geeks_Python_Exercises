type Person = {
    name: string;
    age: number;
};

function createPerson(name: string, age: number): Person {
    const person: Person = {
        name: name,
        age: age,
    };
    return person;
}

const newPerson = createPerson("Alice", 28);
console.log("Created person:", newPerson);
console.log("Person's name:", newPerson.name);
console.log("Person's age:", newPerson.age);

const anotherPerson = createPerson("Bob", 35);
console.log("Another person:", anotherPerson);
