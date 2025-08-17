class Employee {
    public name: string;
    private age: number;
    protected salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    protected calculateBonus(salary: number): number {
        return salary * 0.1;
    }

    getSalaryDetails() {
        return {
            name: this.name,
            age: this.age,
            salary: this.salary,
        };
    }
}

class Manager extends Employee {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    getSalaryDetails() {
        const bonus = this.calculateBonus(this.salary);
        return {
            ...super.getSalaryDetails(),
            bonus: bonus,
        };
    }
}

class ExecutiveManager extends Manager {
    constructor(name: string, age: number, salary: number) {
        super(name, age, salary);
    }

    approveBudget(amount: number): string {
        return `${this.name} has approved a budget of $${amount}.`;
    }
}

const executiveManager = new ExecutiveManager("Alice", 40, 100000);
console.log(executiveManager.getSalaryDetails());
console.log(executiveManager.approveBudget(500000));