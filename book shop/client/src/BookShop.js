import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this import

function BookShop({ onLogout }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // <-- Add this line

  // Fetch books from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:8800/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  // Function to handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8800/books/${id}`, {
        method: "DELETE",
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  // Function to handle update (navigate to update page)
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="bookshop-container">
      <div className="header-bar">
        <h1 className="shop-title">Book Shop</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
      <div className="books-grid">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={`http://localhost:8800/images/${book.cover}`} alt={book.title} className="book-img" />
              <h2 className="book-title">{book.title}</h2>
              <p className="book-desc">{book.desc}</p>
              <div className="book-price">${book.price}</div>
              <div className="book-actions">
                <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
                <button className="update-btn" onClick={() => handleUpdate(book.id)}>Update</button>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="add-btn" onClick={() => navigate("/add")}>Add new book</button>
    </div>
  );
}

export default BookShop;