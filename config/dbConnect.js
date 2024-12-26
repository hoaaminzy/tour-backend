const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);

    console.log("Database connect successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
