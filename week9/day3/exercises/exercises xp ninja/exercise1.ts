interface Item {
    id: number;
    name: string;
}
interface Product {
    price: number;
    category: string;
}

class Container<T extends Item & Product> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(id: number): T | undefined {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return undefined;
    }

    list(): T[] {
        return this.items;
    }
}

const container = new Container<Item & Product>();
container.add({ id: 1, name: "Item 1", price: 100, category: "Category A" });
container.add({ id: 2, name: "Item 2", price: 200, category: "Category B" });
console.log(container.list());
console.log(container.remove(1));
console.log(container.list());