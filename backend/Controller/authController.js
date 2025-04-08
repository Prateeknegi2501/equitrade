const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User is already registered", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMsg = "Auth failed. Email or password is wrong";

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "User is not registered", success: false });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id,name:user.name },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      name: user.name,
      email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
