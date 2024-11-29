const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyStaffAssignmentSchema = new Schema(
  {
    HSA: {
      type: Object,
    },
    staff: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "historyStaffAssignment",
  historyStaffAssignmentSchema
);
