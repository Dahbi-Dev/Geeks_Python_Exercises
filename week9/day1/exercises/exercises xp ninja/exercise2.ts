

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = {
    name: "Alice",
    age: 30,
    isEmployed: true,
};
console.log(getProperty(person, "name")); // "Alice"
console.log(getProperty(person, "age")); // 30
