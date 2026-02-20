//start server.
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
/*app.get("/", (req, res) => {
  res.send("welcome");
});*/
connectDB();
app.listen(8000, () => {
  console.log("server is running at port 8000");
});
