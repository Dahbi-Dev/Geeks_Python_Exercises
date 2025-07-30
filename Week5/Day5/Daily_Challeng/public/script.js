   let correctAnswer = ''
        let score = 0
        let playerName = ''

        document.getElementById('start').addEventListener('click', () => {
            playerName = document.getElementById('player').value.trim()
            if (!playerName) return
            score = 0
            document.getElementById('score').textContent = score
            loadEmoji()
        })

        function loadEmoji() {
            fetch('http://localhost:5000/api/emoji')
                .then(res => res.json())
                .then(data => {
                    correctAnswer = data.correct
                    document.getElementById('emoji').textContent = data.emoji
                    const form = document.getElementById('guess-form')
                    form.innerHTML = ''
                    data.options.forEach(opt => {
                        const btn = document.createElement('button')
                        btn.textContent = opt
                        btn.type = 'button'
                        btn.onclick = () => submitGuess(opt)
                        form.appendChild(btn)
                    })
                })
        }

        function submitGuess(guess) {
            fetch('http://localhost:5000/api/guess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guess, correct: correctAnswer, player: playerName })
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById('feedback').textContent = data.isCorrect ? 'Correct!' : 'Wrong!'
                score = data.score
                document.getElementById('score').textContent = score
                loadEmoji()
                loadLeaderboard()
            })
        }

        function loadLeaderboard() {
            fetch('http://localhost:5000/api/leaderboard')
                .then(res => res.json())
                .then(data => {
                    const ul = document.getElementById('leaderboard')
                    ul.innerHTML = ''
                    data.forEach(p => {
                        const li = document.createElement('li')
                        li.textContent = `${p.name}: ${p.score}`
                        ul.appendChild(li)
                    })
                })
        }