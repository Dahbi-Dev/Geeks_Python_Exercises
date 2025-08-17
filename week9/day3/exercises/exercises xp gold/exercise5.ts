interface Item<T> {
    property: T
    add(item: T): void
    remove(): T | undefined;
}

class Queue<T> implements Item<T> {
    property: T

    constructor(property: T) {
        this.property = property;
    }

    private items: T[] = []

    add(item: T) {
        this.items.push(item)
    }

    remove(): T | undefined {
        return this.items.shift()
    }
    
}

const numberQueue = new Queue<number>(0);
const stringQueue = new Queue<string>("");
const booleanQueue = new Queue<boolean>(false);

numberQueue.add(1);
numberQueue.add(2);
stringQueue.add("Hello");
stringQueue.add("World");
booleanQueue.add(true);
booleanQueue.add(false);

console.log(numberQueue.remove()); // 1
console.log(stringQueue.remove()); // "Hello"
console.log(booleanQueue.remove()); // true


