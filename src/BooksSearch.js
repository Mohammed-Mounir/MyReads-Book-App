import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class BooksSearch extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={(evt) => this.props.onSearch(evt)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books?.map((book) => (
              <Book
                key={book.id}
                book={book}
                onSelectChange={this.props.onSelectChange}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BooksSearch;
