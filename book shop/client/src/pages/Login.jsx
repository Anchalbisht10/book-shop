import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Add this line to import the CSS

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    navigate("/");
  };

  return (
    <div className="login-background">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Book Shop Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}