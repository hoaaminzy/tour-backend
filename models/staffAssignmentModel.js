const mongoose = require("mongoose");

const StaffAssignmentSchema = new mongoose.Schema({
  staffId: String,
  staffName: String,
  tourId: String,
  tourDetailId: String,
  bookingId: String,
  assignedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StaffAssignment", StaffAssignmentSchema);
