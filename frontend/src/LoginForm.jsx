import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'; // Or your specific CSS file

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(user.role === "vendor" ? "/vendor-dashboard" : "/customer-dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <button
            style={{
              background: "none",
              border: "none",
              color: "black",
              textDecoration: "underline",
              cursor: "pointer",
              padding: 12,
              fontSize:15,
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
