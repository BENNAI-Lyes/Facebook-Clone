const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

//use configurations midellwars
dotenv.config();
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "public/images")));

//conncet to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("can not connected to mongodb", err);
  });

//import routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

//middlwars
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

//upload file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("file uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

//listenn on server
app.listen(8000, () => {
  console.log("server running on port 8000");
});
