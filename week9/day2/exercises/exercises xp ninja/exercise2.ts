class Shape {
    static totalShapes = 0;

    constructor() {
        Shape.totalShapes++;
    }

    static getType(): string {
        return typeof this;
    }
}

class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    static getType(): string {
        return "Circle";
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Square extends Shape {
    side: number;

    constructor(side: number) {
        super();
        this.side = side;
    }

    static getType(): string {
        return "Square";
    }

    area(): number {
        return this.side * this.side;
    }
}

const circle = new Circle(5);
const square = new Square(4);
console.log(`Shape Type: ${Circle.getType()}, Area: ${circle.area()}`);
console.log(`Shape Type: ${Square.getType()}, Area: ${square.area()}`);
console.log(`Total Shapes Created: ${Shape.totalShapes}`);