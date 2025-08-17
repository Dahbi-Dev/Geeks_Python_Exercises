
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): string {
        return "Some generic animal sound";
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): string {
        return "bark";
    }
}

const myDog = new Dog("Buddy");
console.log(`${myDog.name} says: ${myDog.makeSound()}`); 
