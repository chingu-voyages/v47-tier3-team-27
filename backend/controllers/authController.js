const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = require("../models/User");

// SIGN UP

async function signUp(req, res) {
  const { username, email, password, image } = req.body;

  try {
    // secure password saved in DB
    const hashedPassword = await bcrypt.hash(password, 8);

    // create new user in DB
    const newUser = new User({
      email,
      hashedPassword,
      username,
      image,
    });

    const response = await newUser.save();

    if (!response) {
      res.status(500).json({ Error: "Failed to add new user" });
    }

    console.log("New User created successfully!");

    // if user created create JWT
    const token = jwt.sign({ id: response.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res
      .status(201)
      .send({ token: token, userId: response.id, username: response.username });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// SIGN IN

async function signIn(req, res) {
  const { username, email, password } = req.body;

  try {
    // search user in DB
    const user = await User.findOne({ email: email });

    // handle if no user found
    if (!user) {
      res.status(404).send({ message: "Incorrect Credentials!" });
    }
    // if user found, check password
    const passwordIsValid = bcrypt.compareSync(password, user.hashedPassword);

    if (!passwordIsValid) {
      res.status(404).send({ message: "Incorrect Credentials!" });
    }

    // if user exists and password is correct create JWT
    const token = jwt.sign({ userId: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      token: token,
      userId: user.id,
      username: user.username,
      tasks: user.tasks,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// SIGN OUT

async function signOut(req, res) {
  try {
    req.session = null;
    res.status(200).send({ message: "You've been signed out!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

async function checkEmailExists(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(200).send({ userId: user.id });
    } else {
      res.status(404).send({ message: "No user found with that email." });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

module.exports = { signUp, signIn, signOut, checkEmailExists };
