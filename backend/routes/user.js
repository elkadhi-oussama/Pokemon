const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {loginRules,registerRules,validation} = require ("../middleware/validator")
const isAuth = require("../middleware/isAuth")
//register
router.post("/register", registerRules(),validation, async (req, res) => {
  const { name, pseduo, email, password } = req.body;

  try {
    const newUser = new User({ name, pseduo, email, password });
    //check if the user exist
    const userEmail = await User.findOne({ email });
    const userPseduo = await User.findOne({ pseduo });
    if (userEmail) {
      return res.status(400).send({ msg: "email already exist" });
    }
    if (userPseduo) {
      return res.status(400).send({ msg: "Pseduo already exist" });
    }
    // hashed password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    newUser.password = hashedPassword;
    //save user
    const userToken = await newUser.save();
    // cree token
    const payload = {
      _id: userToken._id,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    res.status(200).send({ msg: "user is saved",user: userToken, token:`Bearer ${token}` });
  } catch (error) {
    res.status(500).send({ msg: "Cannot Save the User" });
  }
});

//login
router.post("/login",loginRules(),validation, async (req, res) => {
  const { email, password } = req.body;
  try {
    // find if the user exist
    const mailUser = await User.findOne({ email });
    //if the email or pseudo not exist
    if (!mailUser) {
      return res.status(400).send({ msg: "Bad Credential" });
    }
    //password are equals
    const match = await bcrypt.compare(password, mailUser.password);
    if (!match) {
      return res.status(400).send({ msg: "Bad Credential" });
    }
    // cree token
    const payload = {
      _id: mailUser._id,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    //send the user
    res.status(200).send({ msg: "success login",user: mailUser, token:`Bearer ${token}` });
  } catch (error) {
    res.status(500).send({ msg: "can not get the user " });
  }
});

// authenticate
router.get("/current", isAuth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
