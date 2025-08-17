interface Shape {
    color: string;
    getArea(): number;
}

interface Rectangle extends Shape {
    readonly width: number;
    readonly height: number;
    getPerimeter(): number;
}

class Rect implements Rectangle {
    color: string;
    readonly width: number;
    readonly height: number;

    constructor(c: string, w: number, h: number) {
        this.color = c;
        this.width = w;
        this.height = h;
    }

    getArea(): number {
        return this.height * this.width
    }

    getPerimeter(): number {
        return 2 * this.height + 2 * this.width;
    }
}

const rect = new Rect('red', 5, 10);
console.log(rect.getArea());