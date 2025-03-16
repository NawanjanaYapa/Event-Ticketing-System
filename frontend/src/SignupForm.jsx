import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "customer" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user data to localStorage (simulate backend behavior)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...users, formData]));

    alert(`Account created successfully as a ${formData.role}. Please log in.`);
    navigate("/"); // Redirect to Login page
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Sign up as:</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
