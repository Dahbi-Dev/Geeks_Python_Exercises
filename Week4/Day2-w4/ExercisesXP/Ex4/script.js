

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

const welcomeArr = []
const Full_Stack_Residents = []
users.map((value) => {
    welcomeArr.push(`Hello ${value.firstName}`)
})

users.filter(item => {
    if (item.role === "Full Stack Resident") {
        Full_Stack_Residents.push(item)
    }
})



console.log("---------Q1----------")
console.log(welcomeArr)
console.log("---------Q2----------")
console.log(Full_Stack_Residents)
console.log("--------Q3-----------")
users.filter(item => item.role === "Full Stack Resident").map(item => {
    const newArr = new Array(item.lastName, item.role)
    const div = document.getElementById("container")
    const list = document.createElement("li")
    list.textContent = `Last Name : ${newArr[0]} --  Role : ${newArr[1]}`
    div.appendChild(list)
    console.log(newArr)

})


