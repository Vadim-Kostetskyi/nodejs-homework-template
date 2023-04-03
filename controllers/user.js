const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);

    user.token = token;
    await user.save();

    res.send({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = req.user;

    user.token = null;
    user.save();

    res.status(204).send({ message: "User logout" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = req.user;
    const { email, subscription } = user;
    res.status(200).send({ email, subscription });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const userSubscription = async (req, res) => {
  const { subscription } = req.body;
  const validSubscriptions = ["starter", "pro", "business"];

  if (!validSubscriptions.includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription value" });
  }

  try {
    const user = await User.findById(req.user._id);
    user.subscription = subscription;
    await user.save();

    res.status(200).json({ message: "Subscription updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginUser,
  logoutUser,
  registerUser,
  currentUser,
  userSubscription,
};
