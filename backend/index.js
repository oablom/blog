const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authenticationRoute = require("./api/routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);

app.listen("5000", () => {
  console.log("Backend server is running!");
});
