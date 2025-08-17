interface Calculator {
    a: number;
    b: number;
    operate: (operation: (a: number, b: number) => number) => number;
}

class AdvancedCalculator implements Calculator {
    a: number;
    b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    operate(operation: (a: number, b: number) => number): number {
        return operation(this.a, this.b);
    }
}

const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;

const calculator = new AdvancedCalculator(10, 5);
console.log("Addition:", calculator.operate(add)); // 15
console.log("Subtraction:", calculator.operate(subtract)); // 5


