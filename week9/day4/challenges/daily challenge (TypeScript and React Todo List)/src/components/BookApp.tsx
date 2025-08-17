import { useState } from "react";
import type { Book } from "../types/Book";
import { List } from "./List";

export function BookApp() {
    const [books, setBooks] = useState<Book[]>([
        { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
        { id: 2, title: "1984", author: "George Orwell" },
        { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { id: 4, title: "Pride and Prejudice", author: "Jane Austen" },
    ]);

    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");

    const addBook = () => {
        if (newTitle.trim() && newAuthor.trim()) {
            const newBook: Book = {
                id: Date.now(), // Simple unique ID generation
                title: newTitle.trim(),
                author: newAuthor.trim(),
            };
            setBooks([...books, newBook]);
            setNewTitle("");
            setNewAuthor("");
        }
    };

    const renderBookItem = (book: Book) => (
        <div className="book-item">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
        </div>
    );

    return (
        <div className="book-app">
            <h1>Book List Application</h1>

            <div className="add-book-form">
                <h2>Add a New Book</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Book Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="form-input"
                    />
                    <button onClick={addBook} className="add-button">
                        Add Book
                    </button>
                </div>
            </div>

            <div className="books-section">
                <h2>My Books ({books.length})</h2>
                <List items={books} renderItem={renderBookItem} />
            </div>
        </div>
    );
}
