import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BookShelves from "./components/Book/BookShelves";
import BooksSearch from "./components/Book/BooksSearch";
import * as BooksAPI from "./api/BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    bookShelves: [
      { shelfKey: "currentlyReading", shelfTitle: "Currently Reading" },
      { shelfKey: "wantToRead", shelfTitle: "Want to Read" },
      { shelfKey: "read", shelfTitle: "Read" },
    ],
    booksSearchResult: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  handleSelectChange = async (evt, bookId) => {
    const shelf = evt.target.value;
    const found = this.state.books.some((book) => book.id === bookId);

    // If the book exists update it, else retrieve it
    if (found) {
      // Copy of current books array
      const booksCopy = this.state.books;

      // Deep clone
      const booksClone = this.state.books.map((book) => ({ ...book }));

      // Finding the intended book object and changing its shelf property
      const book = booksClone.find((book) => book.id === bookId);
      book.shelf = shelf;

      // Setting the state before calling API for better UI responsive
      this.setState({ books: booksClone });

      // Updating
      this.updateSaveBook(book, shelf, booksCopy);
    } else {
      try {
        const book = await BooksAPI.get(bookId);
        book.shelf = shelf;
        // Saving
        this.updateSaveBook(book, shelf);
        this.setState((prevState) => ({ books: [...prevState.books, book] }));
      } catch (err) {
        console.error(err);
      }
    }
  };

  updateSaveBook = async (book, shelf, books = []) => {
    try {
      await BooksAPI.update(book, shelf);
    } catch (err) {
      console.error(err);
      // Rolling back changes
      this.setState({ books });
    }
  };

  handleSearch = async (evt) => {
    const query = evt.target.value;

    try {
      // If the query exists retrieve it and set the state, else restore the initial state
      if (query) {
        const searchResult = await BooksAPI.search(query);

        // Checking if the search result is an array before setting the state
        if (Array.isArray(searchResult)) {
          searchResult.forEach(
            (book) =>
              (book.shelf =
                this.state.books.filter(
                  (storedBook) => storedBook.id === book.id
                )[0]?.shelf || "none")
          );
          this.setState({ booksSearchResult: searchResult });
        } else {
          console.log("No search result");
          this.setState({ booksSearchResult: [] });
        }
      } else {
        this.setState({ booksSearchResult: [] });
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={
              <BooksSearch
                onSearch={this.handleSearch}
                books={this.state.booksSearchResult}
                onSelectChange={this.handleSelectChange}
                onExit={() => this.setState({ booksSearchResult: [] })}
              />
            }
          />

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
                  <Link
                    to="/search"
                    className="btn-search"
                    onClick={() => this.setState({ booksSearchResult: [] })}
                  >
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
