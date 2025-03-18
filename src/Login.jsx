import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Login.css';
const apiurl = import.meta.env.VITE_SERVER_URL;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${apiurl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const result = await response.json();
      console.log(result)
      if (response.status === 200) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userid",result.user.id);
        navigate(`/user/${result.user.id}`);
      } else {
        setError("Failed to log in. Please try again.");
      }
    } catch (error) {
      console.error("Login Error", error);
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup" className="link">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;