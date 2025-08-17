class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    get(index: number): T | undefined {
        return this.items[index];
    }

    list(): T[] {
        return this.items;
    }
}

const numberRepo = new Repository<number>();
numberRepo.add(1);
numberRepo.add(2);
console.log(numberRepo.list()); 

const stringRepo = new Repository<string>();
stringRepo.add("Hello");
stringRepo.add("World");
console.log(stringRepo.list()); 