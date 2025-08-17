type User = {
    type: "user";
    name: string;
    age: number;
};

type Product = {
    type: "product";
    id: number;
    price: number;
};

type Order = {
    type: "order";
    orderId: string;
    amount: number;
};


function handleData(data: Array<User | Product | Order>): Array<string> {
    return data.map(item => {
        if (item.type === "user") {
            return `Hello ${item.name}, you are ${item.age} years old.`;
        } else if (item.type === "product") {
            return `Product ID: ${item.id}, Price: $${item.price}`;
        } else if (item.type === "order") {
            return `Order ID: ${item.orderId}, Amount: $${item.amount}`;
        }
        return "Unknown type";
    });
}

// Example usage
const data: Array<User | Product | Order> = [
    { type: "user", name: "Alice", age: 30 },
    { type: "product", id: 101, price: 29.99 },
    { type: "order", orderId: "ORD12345", amount: 99.99 },
];

const results = handleData(data);
console.log(results);