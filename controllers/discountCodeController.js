const discountCodeModel = require("../models/discountCodeModel");

const addCode = async (req, res) => {
  const { titleCode, code, quantity, discount } = req.body;
  try {
    const newCode = new discountCodeModel({
      titleCode,
      code,
      quantity,
      discount,
    });
    await newCode.save();
    res.json(newCode);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create codes" });
  }
};
const getAllCodes = async (req, res) => {
  try {
    const codes = await discountCodeModel.find();
    res.json(codes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch codes" });
  }
};

const deleteCode = async (req, res) => {
  const { id } = req.params;

  try {
    const code = await discountCodeModel.findByIdAndDelete(id);
    if (!code) return res.status(404).json({ error: "code not found" });
    res.json({ message: "code deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete code" });
  }
};
module.exports = {
  addCode,
  deleteCode,
  getAllCodes,
};
