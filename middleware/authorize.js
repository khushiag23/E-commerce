const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authorize;
