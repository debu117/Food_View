const express = require("express");
const cookieParser = require("cookie-parser");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { logout } = require("../controllers/auth.controller");
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

const cors = require("cors");

const app = express();

// ✅ CORS MUST COME FIRST
app.use(
  cors({
    origin: [
      "https://food-view-gamma.vercel.app",
      "https://food-view-git-main-debu117s-projects.vercel.app",
    ],
    credentials: true,
  }),
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const foodRoutes = require("./routes/food.routes");
app.use("/api/food", foodRoutes);

const foodPartnerRoutes = require("./routes/food-partner.routes");
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;
