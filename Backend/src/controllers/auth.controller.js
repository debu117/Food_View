const userModel = require("../models/user.model");
const foodpartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "fullName, email and password are required",
    });
  }

  const isUserPresent = await userModel.findOne({ email });
  if (isUserPresent) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function LoginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or Password",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function LogoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}
async function registerFoodPartner(req, res) {
  const { name, email, password, contactName, phone, address } = req.body;
  const isAccountAlreadyExist = await foodpartnerModel.findOne({ email });
  if (isAccountAlreadyExist) {
    return res.status(400).json({
      message: "Account already exist with this email",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const foodPartner = await foodpartnerModel.create({
    name,
    email,
    password: hashedPassword,
    contactName,
    phone,
    address,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(201).json({
    message: "Food partner registered successfully",
    foodPartner: {
      id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
      contactName: foodPartner.contactName,
      phone: foodPartner.phone,
      address: foodPartner.address,
    },
  });
}

async function LoginFoodPartner(req, res) {
  const { email, password } = req.body;
  const foodPartner = await foodpartnerModel.findOne({ email });
  if (!foodPartner) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const isPsswordValid = await bcrypt.compare(password, foodPartner.password);
  if (!isPsswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // REQUIRED in production
    sameSite: "none", // REQUIRED for cross-domain
  });
  res.status(200).json({
    message: "Food partner logged in successfully",
    foodPartner: {
      id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
}

async function LogoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  LoginUser,
  LogoutUser,
  registerFoodPartner,
  LoginFoodPartner,
  LogoutFoodPartner,
};
