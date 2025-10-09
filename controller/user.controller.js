const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const JWT = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // res.send("User registered successfully");
    const userData = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email && emailRegex.test(userData.email)) {
      // Email is valid
      const userExists = await User.findOne({ email: userData.email });
      if (userExists) {
        return res.status(400).json({message: "User already exists"});
      }
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      console.log(hashedPassword);
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({message: "User registered successfully"});
    } else {
      return res.status(400).json({message: "Invalid email format"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Internal Server Error"});
  }
};

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }        
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }
        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin },process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};
module.exports = { register, login };
