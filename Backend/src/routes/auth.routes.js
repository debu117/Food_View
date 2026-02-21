const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// ================= USER AUTH =================

router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.LoginUser);
router.get("/user/logout", authController.LogoutUser);

// ✅ ADD THIS ROUTE
router.get("/user/me", authMiddleware.authUserMiddleware, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

// ================= FOOD PARTNER AUTH =================

router.post("/foodpartner/register", authController.registerFoodPartner);
router.post("/foodpartner/login", authController.LoginFoodPartner);
router.get("/foodpartner/logout", authController.LogoutFoodPartner);

module.exports = router;
