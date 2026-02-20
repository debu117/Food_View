const mongoose = require("mongoose");

function connectDB() {
  return mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("DB crashed", err);
    });
}

module.exports = connectDB;
//"mongodb://localhost:27017/food-view_db
