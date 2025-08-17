/*
Create a generic function formatInput that takes a parameter of type T constrained to have a toString() method. Use type assertions to ensure the parameter is treated as a string for formatting. The function should format the input as a string.
*/

function formatInput<T extends { toString(): string }>(value: T): string {
    return value.toString();
}