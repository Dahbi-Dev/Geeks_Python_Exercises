import express from 'express'
import { AnswerQuiz, getQuiz, getScore} from '../controllers/quiz.controller.js'
const router = express.Router()



//  get all 
router.get('/quiz', getQuiz)

// create book
router.post('/quiz', AnswerQuiz)

// get quiz score
router.get('/quiz/score', getScore)



export default router