import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import axios from "axios";
axios.defaults.withCredentials = true;
import UserRegister from "../pages/auth/UserRegister";
import ChooseRegister from "../pages/auth/ChooseRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import BottomNav from "../components/BottomNav";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    axios
      .get("https://food-view-x2nr.onrender.com/api/auth/user/me", {
        withCredentials: true,
      })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                <Home />
                <BottomNav />
              </>
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />

        <Route
          path="/saved"
          element={
            isLoggedIn ? (
              <>
                <Saved />
                <BottomNav />
              </>
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />

        <Route
          path="/create-food"
          element={
            isLoggedIn ? <CreateFood /> : <Navigate to="/food-partner/login" />
          }
        />

        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
