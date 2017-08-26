import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';

import './App.css'
import Bookshelf from "./Bookshelf"

class Main extends Component {
    static PropTypes = {
        books: PropTypes.array.isRequired,
        onBookshelfChanged: PropTypes.func
    }

    onBookshelfChanged = (shelf, id) => {
        if(this.props.onBookshelfChanged)
        this.props.onBookshelfChanged(shelf, id);
    }

    render() {
        var books = [];
        if(this.props.books)
        books = this.props.books;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                            name="Currently Reading"
                            books={books.filter((b) => b.shelf === 'currentlyReading' )}
                            onBookshelfChanged={(shelf, id) => this.onBookshelfChanged(shelf, id)}
                        />
                        <Bookshelf
                            name="Want to Read"
                            books={books.filter((b) => b.shelf ==='wantToRead')}
                            onBookshelfChanged={(shelf, id) => this.onBookshelfChanged(shelf, id)}
                        />
                        <Bookshelf
                            name="Read"
                            books={books.filter((b) => b.shelf ==='read')}
                            onBookshelfChanged={(shelf, id) => this.onBookshelfChanged(shelf, id)}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Main