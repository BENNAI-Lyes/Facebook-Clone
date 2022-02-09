const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//register a new user
router.post("/register", async (req, res) => {
  try {
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creat a new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    //save a user to DB
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    //get user form DB
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("user does not found");

    //check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).json("wrong email or password");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
