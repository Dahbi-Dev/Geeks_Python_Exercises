class Car {
    readonly make: string;
    private model: string;
    public year: number;

    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    getCarDetails() {
        return {
            make: this.make,
            model: this.model,
            year: this.year,
        };
    }
}

const car = new Car('Toyota', 'Camry', 2022);
console.log(car.getCarDetails());
// car.make = 'Honda'; // Error
// car.model = 'Accord'; // Error