const todos = [];


export const getAllTodos = (req, res) => {
    res.status(200).send(todos)
}

export const createTodos = (req, res) => {
    try {
        const newTodos = {
            id: todos.length + 1,
            title: req.body.title,
            content: req.body.content
        }

        todos.push(newTodos)
        if (todos.length + 1) {
            res.status(201).json(todos)

        } else {
            res.status(400).json("Erro While Creating new todo list ")
        }

    } catch (error) {
        console.error(error)

    }
}

export const updateTodos = (req, res) => {
    try {
        const id = Number(req.params.id)
        const index = todos.findIndex(todo => todo.id === id)

        if (index === -1) {
            res.status(404).json("Todo Not Found")
        }else{
            const updatedTodos = {
            id: todos[index].id,
            title: req.body.title,
            content: req.body.content
        }

        todos[index] = updatedTodos
        res.status(201).json(todos)
        }

        

    } catch (error) {
        console.error(error)
    }
}

export const deleteTodos = (req, res) => {
    try {
        const id = Number(req.params.id)
        const index = todos.findIndex(todo => todo.id === id)

        if (index === -1) {
            res.status(404).json("Not Found")
            console.log("Not Found")
        } else {
            todos.splice(index, 1)
            res.status(200).json(todos)
        }



    } catch (error) {
        console.error(error)
    }
}