const students = [{
        name: "Ray",
        course: "Computer Science",
        isPassed: true
    },
    {
        name: "Liam",
        course: "Computer Science",
        isPassed: false
    },
    {
        name: "Jenner",
        course: "Information Technology",
        isPassed: true
    },
    {
        name: "Marco",
        course: "Robotics",
        isPassed: true
    },
    {
        name: "Kimberly",
        course: "Artificial Intelligence",
        isPassed: false
    },
    {
        name: "Jamie",
        course: "Big Data",
        isPassed: false
    }
];

let passedStudents = []
let congratulations = ""
students.filter((items) => {
    if (items.isPassed) {
        passedStudents.push(items)
    }
})

console.log("-----Q1------")
console.log(passedStudents)
console.log("-----Q2------")


passedStudents.forEach((message) => {
    if (message.isPassed)
        congratulations = `Good job ${message.name} ou passed the course in ${message.course}`
    console.log(congratulations)
})


