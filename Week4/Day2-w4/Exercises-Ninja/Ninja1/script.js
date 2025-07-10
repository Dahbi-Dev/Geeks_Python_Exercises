// Exercise 1
const data = [{
        name: 'Butters',
        age: 3,
        type: 'dog'
    },
    {
        name: 'Cuty',
        age: 5,
        type: 'rabbit'
    },
    {
        name: 'Lizzy',
        age: 6,
        type: 'dog'
    },
    {
        name: 'Red',
        age: 1,
        type: 'cat'
    },
    {
        name: 'Joey',
        age: 3,
        type: 'dog'
    },
    {
        name: 'Rex',
        age: 10,
        type: 'dog'
    },
];


const sumOdogsInHumanAges = data.reduce((sum, dog) => {
    if (dog.type === 'dog') return sum + dog.age * 7
    return sum
}, 0)

console.log(sumOdogsInHumanAges)





// Exercise 2
const userEmail3 = ' canno tfillemailformcorre ctly@gmail. com '
const finalEmail =userEmail3.replace(/\s+/g, "")
console.log(finalEmail)


// Exercise 3
const users = [{
    firstName: 'Bradley',
    lastName: 'Bouley',
        role: 'Full Stack Resident'
    },
    {
        firstName: 'Chloe',
        lastName: 'Alnaji',
        role: 'Full Stack Resident'
    },
    {
        firstName: 'Jonathan',
        lastName: 'Baughn',
        role: 'Enterprise Instructor'
    },
    {
        firstName: 'Michael',
        lastName: 'Herman',
        role: 'Lead Instructor'
    },
    {
        firstName: 'Robert',
        lastName: 'Hajek',
        role: 'Full Stack Resident'
    },
    {
        firstName: 'Wes',
        lastName: 'Reid',
        role: 'Instructor'
    },
    {
        firstName: 'Zach',
        lastName: 'Klabunde',
        role: 'Instructor'
    }
];

let new_users = users.map((user) =>{
   fullName = `${user.firstName} ${user.lastName}`
   return {[fullName] : user.role}
  
})

console.log(new_users)



// Exercise 4
const letters = ['x', 'y', 'z', 'z'];
let obj = {}
for(let item of letters){
    obj[item] = (obj[item] || 0) +1
 
}
console.log(obj)

let object = {}
object = letters.reduce((acc  , item)=>{
  acc[item] = (acc[item] || 0 ) +1
   return  acc
}, {})
console.log(object)