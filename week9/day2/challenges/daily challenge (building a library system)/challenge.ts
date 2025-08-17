/**
 * Create a simple library system with TypeScript:

Interface Book: Define an interface Book with the following properties:

title (string)
author (string)
isbn (string)
publishedYear (number)
An optional genre property (string)

Class Library: Create a class Library with:

A private property books (array of Book).
A public method addBook to add a new book to the library.
A public method getBookDetails that returns details of a book based on the isbn.
Class DigitalLibrary: Create a class DigitalLibrary that extends Library and adds:

A readonly property website (string) for the library’s website.
A public method listBooks that returns a list of all book titles in the library.
Create an instance of DigitalLibrary, add some books to it, and then print out the details of the books and the list of all book titles.
 */

interface Book {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string;
}

class Library {
    private books: Book[] = [];

    addBook(book: Book) {
        this.books.push(book);
    }

    getBookDetails(isbn: string): Book {
        const book = this.books.find((book) => book.isbn === isbn);
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found`);
        }
        return book;
    }
}

class DigitalLibrary extends Library {
    readonly website: string;

    constructor(website: string) {
        super();
        this.website = website;
    }

    listBooks() {
        return this.books.map((book) => book.title);
    }
}

const digitalLibrary = new DigitalLibrary('https://www.example.com');
digitalLibrary.addBook({
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780547249755',
    publishedYear: 1925,
    genre: 'Fiction',
});
digitalLibrary.addBook({
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780547442189',
    publishedYear: 1960,
    genre: 'Fiction',
});
digitalLibrary.addBook({
    title: '1984',
    author: 'George Orwell',
    isbn: '9780547442189',
    publishedYear: 1949,
    genre: 'Fiction',
});

console.log(digitalLibrary.getBookDetails('9780547442189'));
console.log(digitalLibrary.listBooks());
