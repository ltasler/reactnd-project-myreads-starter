import React, {Component, } from 'react'
import {Route} from 'react-router-dom'

import './App.css'

import Main from "./Main";
import Search from "./Search"

class BooksApp extends Component {

  render() {
    return (
      <div className="app">
          <Route path="/search" render={() => (
              <Search/>
          )}/>
          <Route exact path="/" render={() => (
          <Main/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
