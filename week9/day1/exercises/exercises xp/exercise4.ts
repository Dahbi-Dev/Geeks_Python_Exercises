function checkNumber(num: number): string {
    if (num > 0) {
        return "The number is positive";
    } else if (num < 0) {
        return "The number is negative";
    } else {
        return "The number is zero";
    }
}

console.log(checkNumber(5));
console.log(checkNumber(-3));
console.log(checkNumber(0));
console.log(checkNumber(42));
console.log(checkNumber(-100));
