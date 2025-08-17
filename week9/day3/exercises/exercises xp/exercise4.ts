/* Create a function getFirstElement that takes an array of number | string and uses type assertions to return the first element as a string. Test with arrays of mixed types.*/


function getFirstElement(arr: Array<number | string>) : string {
    return arr[0] as string
}

let first = getFirstElement([1, 2, 3, 4, 5, 6])
console.log(first)

let firstElement = getFirstElement(["1", "2", "3", "4", "5"])
console.log(firstElement)


