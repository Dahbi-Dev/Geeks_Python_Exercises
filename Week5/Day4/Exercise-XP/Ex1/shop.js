import { products } from './products.js';

function shop(name){
    const data = products.find((item)=>  item.name === name)
    return data;
}

const result = shop("Headphones")
console.log(result)

