import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './App.css'
import {getAll} from "./BooksAPI";
import Bookshelf from "./Bookshelf"

class Main extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        getAll().then((b) => {
            this.setState({books: b});
            console.log(b);
        });
    }

    render() {
        const books = this.state.books;
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
                        />
                        <Bookshelf
                            name="Want to Read"
                            books={books.filter((b) => b.shelf ==='wantToRead')}
                        />
                        <Bookshelf
                            name="Read"
                            books={books.filter((b) => b.shelf ==='read')}
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