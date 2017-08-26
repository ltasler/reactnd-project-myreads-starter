import React, {Component, } from 'react'
import {Route} from 'react-router-dom'

import './App.css'

import Main from "./Main";
import Search from "./Search"
import {getAll, update} from "./BooksAPI";

class BooksApp extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        getAll().then((b) => {
            this.setState({books: b});
        });
    }

    updateBook = (shelf, bookId) => {
        this.setState((state) => {
            books: state.books.map((b, idx) => {
               if(b.id === bookId) {
                   b.shelf = shelf;
               }
               return b;
            });
        });
    }

    onShelfChange = (shelf, bookId) => {
        var book = this.state.books.filter((b) => b.id === bookId);
        if(book.length > 0) {
            update(book[0], shelf);
            this.updateBook(shelf, bookId);
        }
    }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
              <Search/>
          )}/>
          <Route exact path="/" render={() => (
          <Main
            books={this.state.books}
            onBookshelfChanged={(shelf, id) => this.onShelfChange(shelf, id)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
