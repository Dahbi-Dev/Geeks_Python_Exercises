const books = [];

export const getAllBooks = (req, res) => {
    res.status(200).send(books)
}

export const createBooks = (req, res) => {
    try {
        const newBooks = {
            id: books.length + 1,
            title: req.body.title,
            content: req.body.content
        }

        books.push(newBooks)
        if (books.length + 1) {
            res.status(201).json(books)

        } else {
            res.status(400).json("Erro While Creating new book ")
        }

    } catch (error) {
        console.error(error)

    }
}

export const updateBooks = (req, res) => {
    try {
        const id = Number(req.params.id)
        const index = books.findIndex(book => book.id === id)

        if (index === -1) {
            res.status(404).json("Book Not Found")
        }else{
            const updatedBook = {
            id: books[index].id,
            title: req.body.title,
            content: req.body.content
        }

        books[index] = updatedBook
        res.status(201).json(books)
        }

        

    } catch (error) {
        console.error(error)
    }
}

export const deleteBook = (req, res) => {
    try {
        const id = Number(req.params.id)
        const index = books.findIndex(book => book.id === id)

        if (index === -1) {
            res.status(404).json("Book Not Found")
            console.log("Book Not Found")
        } else {
            books.splice(index, 1)
            res.status(200).json(books)
        }



    } catch (error) {
        console.error(error)
    }
}