const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://tourdulich:bon13052002@cluster0.k4cp9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Database connect successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
