import React from "react";

const BookSelector = ({ books, onBookSelect, selectedBook }) => (
  <div className="button-group">
    {books.map((book) => (
      <button
        key={book.id}
        onClick={() => onBookSelect(book)}
        className={selectedBook?.id === book.id ? "active" : ""}
      >
        {book.title}
      </button>
    ))}
  </div>
);

export default BookSelector;
