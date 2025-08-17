interface Storagee<T> {
    add(item: T): void
    get(index: number): T | undefined
}

class Box<T> implements Storagee<T> {
    private items: T[] = []

    add(item: T): void {
        this.items.push(item)
    }

    get(index: number): T | undefined {
        return this.items.at(index)
    }
} 

const box = new Box<string>()
box.add("item1")
box.add("item2")

console.log(box.get(0))
console.log(box.get(1))