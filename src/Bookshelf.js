import React, {Component, PropTypes} from 'react'

import Book from './Book'
import './App.css'

class Bookshelf extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired
    }

    render() {
        const books = this.props.books;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((b) => (
                            <li>
                                <Book
                                title = {b.title}
                                imageUrl = {b.imageLinks.thumbnail}
                                authors = {b.authors}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf