class Employee {
    protected name: string;
    protected salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getDetails() {
        return {
            name: this.name,
            salary: this.salary,
        };
    }
}

class Manager extends Employee {
    department: string;

    constructor(name: string, salary: number, department: string) {
        super(name, salary);
        this.department = department;
    }

    getDetails() {
        return {
            ...super.getDetails(),
            department: this.department,
        };
    }
}

const manager = new Manager('John Doe', 10000, 'IT');
console.log(manager.getDetails());