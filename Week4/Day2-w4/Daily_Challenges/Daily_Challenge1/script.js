const gameInfo = [{
        username: "john",
        team: "red",
        score: 5,
        items: ["ball", "book", "pen"]
    },
    {
        username: "becky",
        team: "blue",
        score: 10,
        items: ["tape", "backpack", "pen"]
    },
    {
        username: "susy",
        team: "red",
        score: 55,
        items: ["ball", "eraser", "pen"]
    },
    {
        username: "tyson",
        team: "green",
        score: 1,
        items: ["book", "pen"]
    },
];

// -------------------------------

console.log("---Q1----")
let usernameArry = []
gameInfo.forEach((names, index) => {
    usernameArry.push(`${names.username}!`)
})
console.log(usernameArry)

// -------------------------------

console.log("---Q2----")
let nameOfPlayers = []
gameInfo.forEach((players => {
    if (players.score > 5) {
        nameOfPlayers.push(players.username)
    }
}))
console.log(nameOfPlayers)

// -------------------------------

console.log("---Q3----")
const totalScore = gameInfo.reduce((acc, total) => (acc + total.score), 0)

console.log(totalScore)