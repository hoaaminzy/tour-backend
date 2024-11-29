const blogModel = require("../models/blogModel");

const blog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const imagePath = req.file ? req.file.path : null;
    console.log("Image Path:", imagePath);
    const newBlog = new blogModel({
      title,
      content,
      image: imagePath,
    });
    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create blog" });
  }
};
const getAllBlog = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const blog = await blogModel.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    if (image) blog.image = image;

    await blog.save();
    res.json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
};
module.exports = {
  blog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
