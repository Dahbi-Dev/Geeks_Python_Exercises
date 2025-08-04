const triviaQuestions = [{
        question: "What is the capital of France?",
        answer: "Paris",
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
    },
    {
        question: "What is the largest mammal in the world?",
        answer: "Blue whale",
    },
];



let currentIndex = 0
let score = 0;


export const getQuiz = (req, res) => {
    try {
        const questions = triviaQuestions.map(q => q.question)

        if (currentIndex < questions.length) {
            res.json({
                question: questions[currentIndex]
            });

            currentIndex++
            console.log(
                currentIndex
            )

        } else {
            res.json({
                message: "No more questions!"
            });
        }



    } catch (error) {
        res.status(500).json({
            error: "Internal error"
        });
    }
}





export const AnswerQuiz = (req, res) => {
    try {
        const userAnswer = req.body.answer;

        if (currentIndex >= triviaQuestions.length) {
            return res.json({
                message: "Quiz finished."
            });
        }

        const correctAnswer = triviaQuestions[currentIndex].answer;

        if (userAnswer?.toLowerCase().trim() === correctAnswer.toLowerCase()) {
            score++;
            currentIndex++;
            res.json({
                correct: true,
                message: "Correct!"
            });
        } else {
            res.json({
                correct: false,
                message: "Incorrect. Try again!"
            });
        }


    } catch (error) {
        console.error(error)

    }
}


export const getScore = (req, res) => {
  res.json({
    score,
    total: triviaQuestions.length,
    message: currentIndex >= triviaQuestions.length
      ? "Quiz complete!"
      : "Quiz still in progress.",
  });
};