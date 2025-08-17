interface Operation {
    fn(a: number, b: number): number;
}

class Addition implements Operation {
    fn(a: number, b: number): number {
        return a + b;
    }
}

class Multiplication implements Operation {
    fn(a: number, b: number): number {
        return a * b;
    }
}

const add = new Addition();
console.log(add.fn(1, 2));

const mult = new Multiplication();
console.log(mult.fn(1, 2));
