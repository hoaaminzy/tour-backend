const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//  day la phan quyen
// tạo user
// middleware/auth.js

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await userModel.findOne({ email });
  if (adminUser.role !== "admin") {
    // nếu khác admin thì ko được qua
    res.send({ message: "you are not an admin" });
  } else {
    next();
  }
  // console.log(email)
};

module.exports = { authenticateToken, isAdmin };
