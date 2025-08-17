function describeValue(v: number | string) {
    if (typeof v == "number")
        return "This is a number"
    else if(typeof v == "string")
        return "This is a string"
}

console.log(describeValue(42));
console.log(describeValue("Hello"));