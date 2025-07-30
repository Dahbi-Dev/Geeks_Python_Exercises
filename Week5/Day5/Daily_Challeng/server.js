const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors');


const app = express()
app.use(cors())
const PORT = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🚗', name: 'Car' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🎉', name: 'Party' },
    { emoji: '🍔', name: 'Burger' },
]

let leaderboard = []

function getRandomEmoji() {
    const index = Math.floor(Math.random() * emojis.length)
    const correct = emojis[index]
    const options = [correct.name]
    while (options.length < 4) {
        const opt = emojis[Math.floor(Math.random() * emojis.length)].name
        if (!options.includes(opt)) options.push(opt)
    }
    return {
        emoji: correct.emoji,
        correct: correct.name,
        options: options.sort(() => Math.random() - 0.5)
    }
}

app.get('/api/emoji', (req, res) => {
    const data = getRandomEmoji()
    res.json(data)
})

app.post('/api/guess', (req, res) => {
    const { guess, correct, player } = req.body
    const isCorrect = guess === correct
    let playerScore = leaderboard.find(p => p.name === player)
    if (!playerScore) {
        playerScore = { name: player, score: 0 }
        leaderboard.push(playerScore)
    }
    if (isCorrect) playerScore.score++
    res.json({ isCorrect, score: playerScore.score })
})

app.get('/api/leaderboard', (req, res) => {
    const top = leaderboard.sort((a, b) => b.score - a.score).slice(0, 5)
    res.json(top)
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
