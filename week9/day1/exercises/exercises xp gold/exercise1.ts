function processValue(value: string | number): string {
    if (typeof value === 'number') {
        return `$${value.toFixed(2)}`;
    } else if (typeof value === 'string') {
        return value.split('').reverse().join(''); 
    }
    throw new Error('Invalid input type');
}

console.log(processValue(100)); 
console.log(processValue("Hello"));
console.log(processValue(42.5));