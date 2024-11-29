const tourModel = require("../models/tourModel");
const asyncHandle = require("express-async-handler");

const addTour = async (req, res) => {
  try {
    const {
      title,
      slug,
      city,
      endCity,
      vehicle,
      hotel,
      typeCombo,
      combo,
      inforTourDetail,
    } = req.body;

    // Chuyển đổi lại `inforTourDetail` từ chuỗi JSON về đối tượng nếu cần
    const inforTourDetailObj = JSON.parse(inforTourDetail);

    // Tạo mảng chứa URLs của ảnh đã tải lên Cloudinary
    const images = req.files.map((file) => file.path);

    // Lưu các thông tin khác vào database
    const newTour = new tourModel({
      title,
      slug,
      city,
      endCity,
      vehicle,
      hotel,
      typeCombo,
      combo,
      inforTourDetail: inforTourDetailObj,
      images,
    });

    await newTour.save();
    res.status(200).json({ message: "Tour added successfully!" });
  } catch (error) {
    console.error("Error adding tour:", error);
    res.status(500).json({ message: "There was an error adding the tour!" });
  }
};

const getAllTours = async (req, res) => {
  try {
    const tours = await tourModel.find({});
    res.status(201).send({
      tours,
      success: true,
      message: "get all successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "get all False",
      success: false,
      error: error,
    });
  }
};
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    let { inforTourDetail, ...updateData } = req.body;
    // console.log(id, inforTourDetail, ...updateData);
    // Parse inforTourDetail if it's a JSON string
    if (typeof inforTourDetail === "string") {
      inforTourDetail = JSON.parse(inforTourDetail);
    }

    // Update images if new files are uploaded
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    // Merge inforTourDetail back if it exists in the update data
    if (inforTourDetail) {
      updateData.inforTourDetail = inforTourDetail;
    }

    const updatedTour = await tourModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.json({ message: "Tour updated successfully", tour: updatedTour });
  } catch (error) {
    console.error("Error updating tour:", error);
    res.status(500).json({ message: "There was an error updating the tour!" });
  }
};

const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTour = await tourModel.findByIdAndDelete(id);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTour,
  getAllTours,
  deleteTour,
  updateTour,
};
