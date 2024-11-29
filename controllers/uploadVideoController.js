const path = require('path');
const fs = require('fs');

const uploadVideo = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({
      message: 'Video uploaded successfully!',
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadVideo,
};
