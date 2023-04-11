const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      image: pic,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email }).select("+password");
    if (!userExist)
      return res.status(404).json({ message: "User doesn't exist" });
    const checkPassword = await bcrypt.compare(password, userExist.password);

    if (!checkPassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      pic: userExist.image,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.user.id } });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, fetchAllUsers };
