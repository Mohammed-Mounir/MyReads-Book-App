import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const BooksSearch = (props) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" onClick={props.onExit}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(evt) => props.onSearch(evt)}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.books?.map((book) => (
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

export default BooksSearch;
