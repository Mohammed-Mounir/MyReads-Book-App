import React, { Component } from "react";
import Book from "./Book";

class BookShelves extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.props.shelf === "currentlyReading"
            ? "Currently Reading"
            : this.props.shelf === "wantToRead"
            ? "Want to Read"
            : "Read"}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter((book) => book.shelf === this.props.shelf)
              .map((book) => (
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

export default BookShelves;
