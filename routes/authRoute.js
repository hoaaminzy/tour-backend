const express = require("express");
const route = express.Router();

// const {
//   authMiddleware,
//   isAdmin,
// } = require("../middlewares/authMiddleware.js");
const {
  signUpUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginAdmin,
} = require("../controllers/userController");

route.post("/signup", signUpUser);
route.post("/login", loginUser);
route.get("/get-all-users", getAllUsers);
route.get("/get-all-users", getAllUsers);
route.delete("/delete-user/:id", deleteUser);
route.put("/update-user/:id", updateUser);
route.post("/login-admin", loginAdmin);

// route.post("/admin-login", loginAdmin);

// route.put(
//   "/update-user/:_id",
//   authMiddleware,
//   updateUser
// );
// route.put(
//   "/password",
//   authMiddleware,
//   updatePassword
// );

// route.get(
//   "/get-user/:_id",
//   authMiddleware,
//   isAdmin,
//   getsignUser
// );
// route.get(
//   "/refresh",
//   handleRefreshToken
// );
// route.get("/logout", logout);

// route.delete(
//   "/delete-user/:_id",
//   deletesignUser
// );

module.exports = route;
