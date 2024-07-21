const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

// REGISTER USER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USER

router.post("/login", async (req, res) => {
  try {
    // Check if username and password are provided in the request body
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Username and password are required");
    }

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json("User not found");
    }

    // Decrypt the password and compare with the input password
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    console.log(hashedPassword);
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    if (originalPassword == password) {
      return res.status(401).json("Wrong password");
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    // Send user data and access token in response
    const { password: userPassword, ...userData } = user._doc; // Exclude password from user data
    res.status(200).json({ ...userData, accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});
module.exports = router;
