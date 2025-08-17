interface HasNumericProperty {
    [key: string]: number;
}

function multiplyProperty<O extends HasNumericProperty, T extends keyof O>(
    Obj: O,
    key: T,
    factor: number
): number {
    return Obj[key] * factor;
}

const obj = {
    a: 10,
    b: 20,
    c: 30
};
console.log(multiplyProperty(obj, 'a', 2)); // 20
console.log(multiplyProperty(obj, 'b', 3)); // 60
