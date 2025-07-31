import express from 'express'
import { createTodos, deleteTodos, getAllTodos, updateTodos } from '../controllers/todos.controller.js';
const router = express.Router()



//  get all todos
router.get('/todos', getAllTodos)

// create list 

router.post('/todos', createTodos)



// update todo list :
router.put('/todos/:id', updateTodos)
// delete todos
router.delete('/todos/:id', deleteTodos)







export default router