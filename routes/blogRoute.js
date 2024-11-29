const express = require("express");
const route = express.Router();

const {
  blog,
  getAllBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController.js");
const upload = require("../config/multerConfig.js");

route.post("/add-blog", upload.single("image"), blog);
route.get("/get-all-blogs", getAllBlog);
route.put("/update-blog/:id", upload.single("image"), updateBlog);
route.delete("/delete-blog/:id", deleteBlog);
module.exports = route;
