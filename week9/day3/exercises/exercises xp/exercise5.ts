/*Create a generic function logLength that takes a parameter of type T constrained to types with a length property (like string or Array). The function should log the length.
*/

function logLength<T extends {length: number}> (value: T): void {
    console.log(`Length: ${value.length}`);
}

logLength("Hello, World!"); 
logLength([1, 2, 3, 4, 5]);
// logLength(true); // Error