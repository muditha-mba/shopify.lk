const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const userRoute = require("./routes/userRouter");
const authRoute = require("./routes/authRouter");
const productRoute = require("./routes/productRouter");
const cartRoute = require("./routes/cartRouter");
const orderRoute = require("./routes/orderRouter");
const stripeRoute = require("./routes/stripeRouter");
const cors = require("cors");

const DB = process.env.DB_CONNECTION_STR.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Successfull!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running on port 5000 :)");
});
