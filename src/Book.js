import React, {Component, PropTypes} from 'react'

import './App.css'

class Book extends Component {
    static propTypes = {
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                         style={{
                             width: 128,
                             height: 193,
                             backgroundImage: `url(${this.props.imageUrl})` }}>

                    </div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors.map((a) => (
                    <p>{a}</p>
                ))}</div>
            </div>
        );
    }
}

export default Book