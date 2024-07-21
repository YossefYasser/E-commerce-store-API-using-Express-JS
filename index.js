const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//env configuration
dotenv.config();
// importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

// DB conncetion
mongoose
  .connect("mongodb://127.0.0.1:27017/store")
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log("DB error", err);
  });

app.use(express.json());
// routes middlwares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
