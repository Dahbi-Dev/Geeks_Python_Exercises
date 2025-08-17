
type MappedType<T> = T extends number ? number : T extends string ? number : never;

function mapType<T>(value: T): MappedType<T> {
    if (typeof value === 'number') {
        return (value * value) as MappedType<T>;
    } else if (typeof value === 'string') {
        return value.length as MappedType<T>;
    }
    throw new Error('Invalid type'); 
}
console.log(mapType(5)); // 25 
console.log(mapType('hello'));  // 5
