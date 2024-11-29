const express = require("express");
const route = express.Router();

const {
  assignStaff,
  getAllStaffAssignment,
  updateStaffAssignment,
  unassignStaff,
  hisStaffAssignment,
} = require("../controllers/staffAssignmentController.js");

route.post("/assignStaff", assignStaff);
route.get("/get-all-assignStaff", getAllStaffAssignment);
route.get("/update-assignStaff/:id", updateStaffAssignment);
route.post("/unassignStaff", unassignStaff);
route.post("/history-staff", hisStaffAssignment);

module.exports = route;
