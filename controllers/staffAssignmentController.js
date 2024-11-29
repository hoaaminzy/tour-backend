const StaffAssignment = require("../models/staffAssignmentModel");
const historyStaffAssignment = require("../models/historyStaffAssignment");
// API để gán nhân viên cho tour
const assignStaff = async (req, res) => {
  const { staffId, staffName, tourId, tourDetailId } = req.body;

  try {
    // Kiểm tra xem nhân viên đã được gán cho tour này chưa
    let existingAssignment = await StaffAssignment.findOne({
      tourId,
      tourDetailId,
    });

    if (existingAssignment) {
      // Nếu có gán rồi, chỉ cần cập nhật thông tin nhân viên
      existingAssignment.staffId = staffId;
      existingAssignment.staffName = staffName;

      const updatedAssignment = await existingAssignment.save();
      return res.status(200).json({
        message: "Staff reassigned successfully",
        updatedAssignment,
      });
    }

    // Nếu chưa có gán, tạo mới bản ghi gán nhân viên
    const newAssignment = new StaffAssignment({
      staffId,
      staffName,
      tourId,
      tourDetailId,
    });

    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(500).json({ message: "Error assigning staff", error: err });
  }
};

// API lấy tất cả bản ghi gán nhân viên
const getAllStaffAssignment = async (req, res) => {
  try {
    const staffAssignments = await StaffAssignment.find({});
    res.status(200).json({
      staffAssignments,
      success: true,
      message: "Fetched all staff assignments successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching staff assignments",
      success: false,
      error: error,
    });
  }
};

// API để cập nhật nhân viên đã được gán cho tour
const updateStaffAssignment = async (req, res) => {
  const { id } = req.params; // id là ID của bản ghi gán nhân viên
  const { staffName, staffId } = req.body;

  try {
    const staffAssignment = await StaffAssignment.findById(id);
    if (!staffAssignment) {
      return res.status(404).json({ error: "StaffAssignment not found" });
    }

    // Cập nhật thông tin nhân viên
    staffAssignment.staffId = staffId || staffAssignment.staffId;
    staffAssignment.staffName = staffName || staffAssignment.staffName;

    await staffAssignment.save();
    res.json({ message: "Staff assignment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update staff assignment" });
  }
};
const unassignStaff = async (req, res) => {
  const { tourId, tourDetailId, staffId } = req.body;

  try {
    // Xóa bản ghi assignment của nhân viên
    const assignment = await StaffAssignment.findOneAndDelete({
      tourId,
      tourDetailId,
      staffId,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Staff assignment not found" });
    }

    res.status(200).json({ message: "Staff unassigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unassign staff", error: err });
  }
};

const hisStaffAssignment = async (req, res) => {
  const { HSA, staff } = req.body;
  try {
    const newHSA = new historyStaffAssignment({
      HSA,
      staff,
    });

    const savedHSA = await newHSA.save();
    res.status(201).json(savedHSA);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  assignStaff,
  getAllStaffAssignment,
  updateStaffAssignment,
  unassignStaff,
  hisStaffAssignment,
};
