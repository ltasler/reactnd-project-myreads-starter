import React, {Component, PropTypes} from 'react'

import Book from './Book'
import './App.css'

class Bookshelf extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onBookshelfChanged: PropTypes.func
    }

    onBookshelfChanged = (shelf, id) => {
        if(this.props.onBookshelfChanged)
            this.props.onBookshelfChanged(shelf, id);
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((b) => (
                            <li key={b.id}>
                                <Book
                                    id={b.id}
                                    title={b.title}
                                    imageUrl={b.imageLinks.thumbnail}
                                    authors={b.authors}
                                    changeBookshelf={(shelf, id) => this.onBookshelfChanged(shelf, id)}
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