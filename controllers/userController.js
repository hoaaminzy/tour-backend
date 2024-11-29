const { genarateToken } = require("../config/jwtToken.js");
const { genarateRefreshToken } = require("../config/refreshToken.js");
const userModel = require("../models/userModel.js");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
require("dotenv").config();

// create user
const signUpUser = async (req, res) => {
  const { email, displayName, phoneNumber, address, password, isStaff } =
    req.body;

  try {
    const role = isStaff ? "staff" : "user";

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được đăng ký!" });
    }
    const newUser = new userModel({
      email,
      displayName,
      phoneNumber,
      address,
      password,
      role,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đăng ký thất bại", error: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== "user") {
      return res
        .status(403)
        .json({ message: "Access denied. Only users can login." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ token, user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, displayName, address, phoneNumber } = req.body;

  try {
    // Find the user by ID and update specific fields
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { email, displayName, address, phoneNumber },
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation based on model schema
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "yourSecretKey",
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: { role: user.role, displayName: user.displayName },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// handle refresh token
const handleRefreshToken = asyncHandle(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) {
    res.send({
      success: false,
      message: "No refresh token in cookies",
    });
  }
  const refreshToken = cookie?.refreshToken;
  console.log(refreshToken);
  const user = await userModel.findOne({
    refreshToken,
  });
  if (!user) {
    res.status(401).send({
      success: false,
      message: "No refresh token present in db or not matched",
      user,
    });
  }
  jwt.verify(refreshToken, "SECRET", (err, decoded) => {
    if (err || user.id !== decoded.id) {
      res.status(401).send({
        success: false,
        message: "there is something wrong with refresh token",
      });
    }
    const accessToken = genarateToken(user.id);
    res.status(200).send({
      success: true,
      message: "refresh token success",
      accessToken,
    });
  });
});

// logout func
const logout = asyncHandle(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await userModel.findOne({
    refreshToken,
  });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).send({
      success: true,
      message: "clear cookies success",
    }); // forbidden
  }
  await userModel.findOneAndUpdate(
    { refreshToken },
    {
      $set: { refreshToken: "" },
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.status(200).send({
    success: true,
    message: "clear cookies success",
  }); // forbidden
});

// get all users
const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Get all users error !",
    });
  }
};

// get a user
const getsignUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const getUser = await userModel.findById(_id);
    res.status(200).json({
      success: true,
      message: "Get user successfully !",
      getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Get user error !",
    });
  }
};

// update user
// const updateUser = asyncHandle(async (req, res) => {
//   const { _id } = req.params;
//   try {
//     // Hash lại mật khẩu mới nếu có
//     if (req.body.password) {
//       const salt = await bcrypt.genSaltSync(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }

//     const user = await userModel.findByIdAndUpdate(
//       _id,
//       {
//         name: req?.body?.name,
//         email: req?.body?.email,
//         mobile: req?.body?.mobile,
//         password: req?.body?.password,
//         role: req?.body?.role,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Update user error !",
//     });
//   }
// });

// delete a user
const deletesignUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: "delete user successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "delete user error !",
    });
  }
};
const updatePassword = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const password = req.body.password;
  validateMongooseDbId(_id);
  const user = await userModel.findById(_id);
  console.log(password);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.status(200).send({
      success: true,
      message: "Update password success",
      updatedPassword,
    });
  } else {
    res.status(200).send({
      success: true,
      message: "Update password ...",
      user,
    });
  }
});

module.exports = {
  signUpUser,
  loginUser,
  getAllUsers,
  getsignUser,
  deletesignUser,
  updateUser,
  deleteUser,
  loginAdmin,
  // handleRefreshToken,
  // logout,
  // updatePassword,
  // loginAdmin,
};
