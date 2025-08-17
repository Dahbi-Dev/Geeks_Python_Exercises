class Device {
    readonly serialNumber: string;
    
    constructor(serialNumber: string) {
        this.serialNumber = serialNumber;
    }
    getDeviceInfo(): string {
        return `Device Serial Number: ${this.serialNumber}`;
    }
}

class Laptop extends Device {
    model: string;
    price: number;

    constructor(serialNumber: string, model: string, price: number) {
        super(serialNumber);
        this.model = model;
        this.price = price;
    }

    updatePrice(newPrice: number): void {
        this.price = newPrice;
    }

    getDeviceInfo(): string {
        return `Laptop Model: ${this.model}, Price: $${this.price}, Serial Number: ${this.serialNumber}`;
    }
}

const myLaptop = new Laptop("SN123456", "Dell XPS 13", 999);
myLaptop.updatePrice(899);
console.log(myLaptop.getDeviceInfo());
