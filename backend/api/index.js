const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");
//port

const multer = require("multer");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected! :D");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const filename = req.body.name;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
  console.log("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);

app.listen(PORT, () => {
  console.log("Backend server is running!!!!");
});
