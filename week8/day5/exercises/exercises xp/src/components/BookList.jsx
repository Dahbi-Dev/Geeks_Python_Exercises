import { useSelector } from 'react-redux'
import { useState } from 'react'
import { selectBooks, selectHorrorBooks, selectFantasyBooks, selectScienceFictionBooks } from '../store/selectors'

const BookList = () => {
    const [selectedGenre, setSelectedGenre] = useState('All')

    const allBooks = useSelector(selectBooks)
    const horrorBooks = useSelector(selectHorrorBooks)
    const fantasyBooks = useSelector(selectFantasyBooks)
    const scienceFictionBooks = useSelector(selectScienceFictionBooks)

    const getCurrentBooks = () => {
        switch (selectedGenre) {
            case 'Horror':
                return horrorBooks
            case 'Fantasy':
                return fantasyBooks
            case 'Science Fiction':
                return scienceFictionBooks
            default:
                return allBooks
        }
    }

    const currentBooks = getCurrentBooks()

    return (
        <div className="book-list-container">
            <h1>Book Inventory</h1>

            <div className="genre-selector">
                <h3>Filter by Genre:</h3>
                <div className="genre-buttons">
                    <button
                        className={selectedGenre === 'All' ? 'active' : ''}
                        onClick={() => setSelectedGenre('All')}
                    >
                        All Books ({allBooks.length})
                    </button>
                    <button
                        className={selectedGenre === 'Horror' ? 'active' : ''}
                        onClick={() => setSelectedGenre('Horror')}
                    >
                        Horror ({horrorBooks.length})
                    </button>
                    <button
                        className={selectedGenre === 'Fantasy' ? 'active' : ''}
                        onClick={() => setSelectedGenre('Fantasy')}
                    >
                        Fantasy ({fantasyBooks.length})
                    </button>
                    <button
                        className={selectedGenre === 'Science Fiction' ? 'active' : ''}
                        onClick={() => setSelectedGenre('Science Fiction')}
                    >
                        Science Fiction ({scienceFictionBooks.length})
                    </button>
                </div>
            </div>

            <div className="books-display">
                <h2>{selectedGenre === 'All' ? 'All Books' : `${selectedGenre} Books`}</h2>
                <div className="books-grid">
                    {currentBooks.map(book => (
                        <div key={book.id} className="book-card">
                            <h3>{book.title}</h3>
                            <p className="author">by {book.author}</p>
                            <p className="genre">{book.genre}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookList
