const express = require("express");
const route = express.Router();

const {
  assignStaff,
  getAllStaffAssignment,
  updateStaffAssignment,
  unassignStaff,
  hisStaffAssignment,
  getAllHistoryStaffAss,
} = require("../controllers/staffAssignmentController.js");
const { authenticateToken } = require("../middlewares/authMiddleware.js");

route.post("/assignStaff", assignStaff);
route.get("/get-all-assignStaff", getAllStaffAssignment);
route.get("/update-assignStaff/:id", updateStaffAssignment);
route.post("/unassignStaff", unassignStaff);
route.post("/history-staff", hisStaffAssignment);
route.get("/get-all-history-staff", getAllHistoryStaffAss);

module.exports = route;
