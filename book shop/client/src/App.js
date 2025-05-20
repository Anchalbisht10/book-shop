import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
// import Books from "./pages/Books";
import BookShop from "./BookShop";
import Update from "./pages/Update";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {

    // For now, use a simple check
    if (username === "admin" && password === "anchal123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={isLoggedIn ? <BookShop onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <Add /> : <Navigate to="/login" />}
          />
          <Route
            path="/update/:id"
            element={isLoggedIn ? <Update /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;