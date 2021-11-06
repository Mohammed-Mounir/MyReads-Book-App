import React from "react";

const Book = (props) => {
  const { id, imageLinks, title, authors, shelf } = props.book;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks?.smallThumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={shelf}
              onClick={(evt) => props.onSelectChange(evt, id)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          | {authors?.map((author) => `${author} | `)}
        </div>
      </div>
    </li>
  );
};

export default Book;
