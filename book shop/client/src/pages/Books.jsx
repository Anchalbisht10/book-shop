import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bookshop-container">
      <h1 className="shop-title">Book Shop</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={
                book.cover
                  ? `http://localhost:8800/images/${book.cover}`
                  : "https://via.placeholder.com/140x200?text=No+Image"
              }
              alt={book.title}
              className="book-img"
            />
            <h2 className="book-title">{book.title}</h2>
            <p className="book-desc">{book.desc}</p>
            <div className="book-price">${book.price}</div>
            <div className="book-actions">
              <button className="delete-btn" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <Link to={`/update/${book.id}`}>
                <button className="update-btn">Update</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/add">
        <button className="add-btn">Add new book</button>
      </Link>
    </div>
  );
};

export default Books;