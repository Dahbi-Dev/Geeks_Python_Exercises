/**
 * Create an interface Product with properties name (readonly), price, and an optional discount. Then, create another interface Electronics that extends Product and adds a property warrantyPeriod. Finally, create a class Smartphone that implements the Electronics interface and calculates the price after discount.

Ensure that the name is immutable, and the discount is optional.
 */

interface Product {
    readonly name: string;
    price: number;
    discount?: number;
}

interface Electronics extends Product {
    warrantyPeriod: number;
}

class Smartphone implements Electronics {
    readonly name: string;
    price: number;
    discount?: number;
    warrantyPeriod: number;

    constructor(name: string, price: number, warrantyPeriod: number, discount?: number) {
        this.name = name;
        this.price = price;
        this.warrantyPeriod = warrantyPeriod;
        this.discount = discount;
    }

    calculatePriceAfterDiscount(): number {
        if (this.discount) {
            return this.price - (this.price * this.discount / 100);
        }
        return this.price;
    }

    toString(): string {
        return `Smartphone: ${this.name}, Price: $${this.price}, Warranty Period: ${this.warrantyPeriod} months, Discount: ${this.discount ? this.discount + '%' : 'No discount'} price after discount: $${this.calculatePriceAfterDiscount()}`;
    }
}

const mySmartphone = new Smartphone("Galaxy S21", 799, 24, 10);
console.log(mySmartphone.toString());
