const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

//POST /API/FOOD - create a new food item (only for authenticated food partners){protected route}
router.post(
  "/",
  authMiddleware.authFoodPartnermiddleware,
  upload.single("video"),
  foodController.createFood,
);

/*/GET /API/FOOD - get all food items[Protected route]*/
router.get(
  "/",
  authMiddleware.authUserMiddleware,
  foodController.getAllFoodItems,
);

/*GET /API/food/FOOD-partner/:id*/
router.get(
  "/",
  authMiddleware.authUserMiddleware,
  foodController.getAllFoodItems,
);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood,
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood,
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood,
);

module.exports = router;
