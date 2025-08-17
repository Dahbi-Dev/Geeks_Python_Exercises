function sumNumbersInArray(arr: Array<string | number>): number {
    let sum = 0;
    for (const item of arr) {
        if (typeof item === 'number') {
            sum += item;
        }
    }
    return sum;     
}

console.log(sumNumbersInArray([1, '2', 3, '4', 5])); // 9
console.log(sumNumbersInArray(['10', 20, '30', 40])); // 60
console.log(sumNumbersInArray([1, 2, 3])); // 6