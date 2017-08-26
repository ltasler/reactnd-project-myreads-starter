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

    onShelfChange = (shelf, bookId) => {
        var book = this.state.books.filter((b) => b.id === bookId);
        update(book[0], shelf).then((b) => {
            getAll().then((b) => {
               this.setState({books: b});
            });
        });
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
