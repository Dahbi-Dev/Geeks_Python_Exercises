type Person = {
    name: string;
    age: number;
}

type Job = {
    position: string;
    department: string;
}

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
    if (employee.position === "Manager") {
        return `${employee.name} is a Manager in the ${employee.department} department.`;
    } else if (employee.position === "Developer") {
        return `${employee.name} is a Developer in the ${employee.department} department.`;
    } else {
        return `${employee.name} is in the ${employee.department} department.`;
    }
}