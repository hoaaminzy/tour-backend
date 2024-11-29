const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public'); // Store uploads in a specific directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for multer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported file format' }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 50 * 1024 * 1024, files: 10 }, // Max file size and number
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      if (file.mimetype.startsWith('image')) {
        const inputStream = fs.createReadStream(file.path);
        const outputStream = fs.createWriteStream(
          `public/images/${file.filename}`
        );

        try {
          inputStream
            .pipe(
              sharp().resize(3000, 3000).toFormat('jpeg').jpeg({ quality: 90 })
            )
            .pipe(outputStream)
            .on('finish', () => fs.unlinkSync(file.path)); // Delete original file after processing
        } catch (error) {
          console.error(`Error processing file ${file.filename}:`, error);
          return next(error);
        }
      }
    })
  );

  next();
};

const videoUpload = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      if (file.mimetype.startsWith('video')) {
        const targetPath = path.join('public/', file.filename);
        fs.renameSync(file.path, targetPath);
      }
    })
  );
  next();
};

module.exports = {
  uploadPhoto,
  productImgResize,
  videoUpload,
};
