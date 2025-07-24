import { people } from './data.js';

function CalculateAvg (){
    const sum = people.reduce((acc , curr) => acc + curr.age ,0)

    const avrage =  sum / people.length
    console.log(avrage)
}

CalculateAvg()