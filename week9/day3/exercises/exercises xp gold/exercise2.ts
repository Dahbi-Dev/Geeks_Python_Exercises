
function castToType<T>(value: any, typeConstructor: (...args: any[]) => T): T {
    return typeConstructor(value);
}

const stringToNumber = castToType<number>("123", Number);
const stringToBoolean = castToType<boolean>("true", Boolean);

console.log(stringToNumber, typeof stringToNumber); 
console.log(stringToBoolean, typeof stringToBoolean);
