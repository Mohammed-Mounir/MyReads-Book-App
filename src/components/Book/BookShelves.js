import React from "react";
import Book from "./Book";

const BookShelves = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books
            .filter((book) => book.shelf === props.shelf.shelfKey)
            .map((book) => (
              <Book
                key={book.id}
                book={book}
                onSelectChange={props.onSelectChange}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelves;
