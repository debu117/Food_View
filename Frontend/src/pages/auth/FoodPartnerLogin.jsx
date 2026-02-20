import React, { useState } from "react";
import "../../styles/auth-shared.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // ✅ INSIDE component

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/foodpartner/login",
        { email, password },
        { withCredentials: true },
      );

      console.log(response.data);
      navigate("/create-food");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner login</h1>
          <p className="auth-subtitle">
            Access your dashboard and manage orders.
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* ✅ SHOW ERROR MESSAGE */}
          {error && <p className="auth-error">{error}</p>}

          <div className="field-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="business@example.com"
            />
          </div>

          <div className="field-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Password" />
          </div>

          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
