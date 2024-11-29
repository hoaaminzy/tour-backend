const tourBigModal = require("../models/tourBigModel");

const tour = async (req, res) => {
  const { title, location } = req.body;
  try {
    const images = req?.files?.map((file) => file.path) || [];
    const newTour = new tourBigModal({
      title,
      location,
      images,
    });
    await newTour.save();
    res.json(newTour);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create tour" });
  }
};
const getAllTourBig = async (req, res) => {
  try {
    const tourBig = await tourBigModal.find();
    res.json(tourBig);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tour" });
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
  tour,
  getAllTourBig,
  updateBlog,
  deleteBlog,
};
