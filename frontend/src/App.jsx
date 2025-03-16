import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import VendorDashboard from "./VendorDashboard";
import CustomerDashboard from "./CustomerDashboard";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
