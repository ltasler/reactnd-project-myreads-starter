import React, {Component, } from 'react'
import {Route} from 'react-router-dom'

import './App.css'

import Main from "./Main";
import Search from "./Search"
import {getAll, update, get, search} from "./BooksAPI";

class BooksApp extends Component {

    state = {
        books: [],
        queriedBooks: [],
        query: ""
    }

    componentDidMount() {
        getAll().then((b) => {
            this.setState({books: b});
        });
        this.updateSearchResults("");
        console.log(this.state.queriedBooks);
    }

    updateBook = (shelf, bookId) => {
        this.setState((state) => ({
            books: state.books.map((b, idx) => {
               if(b.id === bookId) {
                   b.shelf = shelf;
               }
               return b;
            })
        }));
    }

    addBook = (book, shelf) => {
        book.shelf = shelf;
        this.setState((state) => ({
            books: state.books.concat([book])
        }));
        update(book, shelf)
    }

    onShelfChange = (shelf, bookId) => {
        var book = this.state.books.filter((b) => b.id === bookId);
        if(book.length > 0) {
            update(book[0], shelf);
            this.updateBook(shelf, bookId);
        }
        else {
            get(bookId).then((b) => {
               this.addBook(b, shelf);
            });
        }
    }

    updateSearchResults = (query) => {
        this.clearSearch();
        this.setState({query: query})
        if(query) {
            search(query, 20).then((r) => {
                if(r.error) {
                    this.setState({queriedBooks: []});
                } else {
                    r = r.map((b) => {
                        var onShelf = this.state.books.find((x) => x.id === b.id);
                        b.shelf = "none";
                        if (onShelf)
                            b.shelf = onShelf.shelf;
                        return b;
                    });
                    if(query === this.state.query) //do not update if query has cchangeeed.
                        this.setState({queriedBooks: r});
                }
            });
        } else {
            this.setState({queriedBooks: []});
        }
    }

    clearSearch = () => {
        this.setState({queriedBooks: []});
    }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
              <Search
                  queriedBooks={this.state.queriedBooks}
                  onQueryChanged={(query) => this.updateSearchResults(query)}
                  clearSearch={() => this.clearSearch()}
                  onBookshelfChanged={(shelf, id) => this.onShelfChange(shelf, id)}
              />
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
