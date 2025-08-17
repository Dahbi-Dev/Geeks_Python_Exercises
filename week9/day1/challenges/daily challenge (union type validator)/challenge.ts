function validateUnionType(value: any, allowedTypes: string[]): boolean {
    const valueType = typeof value;
    return allowedTypes.includes(valueType); 
}

console.log(validateUnionType(42, ['number', 'string']));
console.log(validateUnionType("Hello", ['number', 'string']));
console.log(validateUnionType(true, ['number', 'string']));
