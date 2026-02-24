import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import "../styles/bottom-nav.css";

const BottomNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      navigate("/user/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom">
      <div className="bottom-nav__inner">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-nav__label">Home</span>
        </NavLink>

        {/* Saved */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""}`
          }
        >
          <span className="bottom-nav__label">Saved</span>
        </NavLink>

        {/* Logout */}
        <button onClick={handleLogout} className="bottom-nav__item logout-btn">
          <span className="bottom-nav__label">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
