import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BookShelves from "./BookShelves";
import BooksSearch from "./BooksSearch";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    bookShelves: [
      { shelfKey: "currentlyReading", shelfTitle: "Currently Reading" },
      { shelfKey: "wantToRead", shelfTitle: "Want to Read" },
      { shelfKey: "read", shelfTitle: "Read" },
    ],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  handleSelectChange = (evt, bookID) => {
    const shelf = evt.target.value;

    // Copy of current books array
    const booksCopy = this.state.books;

    // Deep clone
    const booksClone = this.state.books.map((book) => ({ ...book }));

    // Finding the intended book object and changing its shelf property
    const book = booksClone.find((book) => book.id === bookID);
    book.shelf = shelf;

    // Setting the state before calling API
    this.setState({ books: booksClone });

    // Calling the API
    BooksAPI.update(book, shelf)
      .then((res) => console.log("Updated Successfully!", res))
      .catch((err) => {
        console.log("Couldn't Update!", err);
        // Rolling back changes
        this.setState({ books: booksCopy });
      });
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route path="/search" element={<BooksSearch />} />

          <Route
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.bookShelves.map((shelf) => (
                      <BookShelves
                        key={shelf.shelfKey}
                        shelf={shelf}
                        books={this.state.books}
                        onSelectChange={this.handleSelectChange}
                      />
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search" className="btn-search">
                    Add a book
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
