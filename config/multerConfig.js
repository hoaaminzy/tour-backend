const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloundinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tour_images", // Thay đổi tên thư mục nếu cần
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;
