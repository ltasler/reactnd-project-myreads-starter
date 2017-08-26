import React, {Component, PropTypes} from 'react'

import './App.css'

class Book extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }

    handleChange = (event) => {
        if(this.props.changeBookshelf)
            this.props.changeBookshelf(event.target.value, this.props.data.id);
    }

    render() {
        let book = this.props.data;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{
                             width: 128,
                             height: 193,
                             backgroundImage: `url(${book.imageLinks.thumbnail})` }}>

                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.handleChange(event)}
                            value={book.shelf}>

                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        );
    }
}

export default Book