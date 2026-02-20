const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

//user auth APIs
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.LoginUser);
router.get("/user/logout", authController.LogoutUser);

//food partner auth APIs
router.post("/foodpartner/register", authController.registerFoodPartner);
router.post("/foodpartner/login", authController.LoginFoodPartner);
router.get("/foodpartner/logout", authController.LogoutFoodPartner);

module.exports = router;
