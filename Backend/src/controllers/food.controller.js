const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const { v4: uuid } = require("uuid");
async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid(),
  );
  const foodItem = await foodModel.create({
    name: req.body.name,
    video: fileUploadResult.url,
    description: req.body.description,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food item created successfully",
    food: foodItem,
  });
}

/*async function getAllFoodItems(req, res) {
  const user = req.user;

  const foodItems = await foodModel.find().populate("foodPartner", "name");

  const foodWithLikeStatus = await Promise.all(
    foodItems.map(async (food) => {
      const isLiked = await likeModel.findOne({
        user: user?._id,
        food: food._id,
      });

      return {
        ...food.toObject(),
        isLiked: !!isLiked,
      };
    }),
  );

  res.status(200).json({
    foodItems: foodWithLikeStatus,
  });
}*/

async function getAllFoodItems(req, res) {
  const user = req.user || null;

  const foodItems = await foodModel.find().populate("foodPartner", "name");

  const foodWithLikeStatus = await Promise.all(
    foodItems.map(async (food) => {
      let isLiked = false;

      if (user) {
        const like = await likeModel.findOne({
          user: user._id,
          food: food._id,
        });

        isLiked = !!like;
      }

      return {
        ...food.toObject(),
        isLiked,
      };
    }),
  );

  res.status(200).json({
    foodItems: foodWithLikeStatus,
  });
}
async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const existingLike = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (existingLike) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: -1 } },
      { new: true },
    );

    return res.status(200).json({
      like: false,
      likeCount: updatedFood.likeCount,
    });
  }

  await likeModel.create({
    user: user._id,
    food: foodId,
  });

  const updatedFood = await foodModel.findByIdAndUpdate(
    foodId,
    { $inc: { likeCount: 1 } },
    { new: true },
  );

  return res.status(200).json({
    like: true,
    likeCount: updatedFood.likeCount,
  });
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;
  const existingSave = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });
  if (existingSave) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: -1 },
    });
    return res.status(200).json({
      message: "Food Unsaved successfully",
    });
  }
  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });
  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { savesCount: 1 },
  });
  res.status(200).json({
    message: "Food Saved successfully",
    save,
  });
}

async function getSaveFood(req, res) {
  const user = req.user;
  const savedFoods = await saveModel.find({ user: user._id }).populate("food");
  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({
      message: "No saved food items found",
    });
  }
  res.status(200).json({
    message: "Saved food items retrieved successfully",
    savedFoods,
  });
}

module.exports = {
  createFood,
  getAllFoodItems,
  likeFood,
  saveFood,
  getSaveFood,
};
