const array = [
    [1],
    [2],
    [3],
    [
        [
            [4]
        ]
    ],
    [
        [
            [5]
        ]
    ]
]

const sepArr = array.map((item, index) => {
    if (index < 3) return item[0]
    return item.flat(2)

})

console.log(sepArr)


const greeting = [
    ["Hello", "young", "grasshopper!"],
    ["you", "are"],
    ["learning", "fast!"]
]

const greetingFinal = greeting.map(arr => arr.join(""))
console.log(greetingFinal)

const message = greeting.flat().join(' ')
console.log(message)


const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]]

const final = trapped.flat(Infinity)
console.log(final)