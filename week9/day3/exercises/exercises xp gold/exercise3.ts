function getArrayLength<T extends number[] | string[]>(arr: T): number {
    return arr.length;
}

const numberArray = [1, 2, 3, 4];
const stringArray = ["a", "b", "c"];

console.log(getArrayLength(numberArray));
console.log(getArrayLength(stringArray));
