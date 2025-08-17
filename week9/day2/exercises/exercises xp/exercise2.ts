class Product {
    readonly id: number;
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getProductInfo(): string {
        return `Product Name: ${this.name}, Price: $${this.price}`;
    }
}

const product = new Product(1, "Laptop", 999.99);
console.log(product.getProductInfo());

// product.id = 2; // Error 