const asyncHandle = require("express-async-handler");
const {
  cloudinaryUploadMedia,
  cloudinaryDeleteMedia,
} = require("../utils/cloudinaly");

// Middleware to upload images or videos
const uploadMedia = asyncHandle(async (req, res) => {
  try {
    const uploader = (path, resourceType) =>
      cloudinaryUploadMedia(path, resourceType);
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path, mimetype } = file;
      const resourceType = mimetype.startsWith("video/") ? "video" : "image";
      console.log(`Uploading ${file.originalname} as ${resourceType}`);
      const newPath = await uploader(path, resourceType);
      urls.push(newPath);
    }

    res.json({ success: true, media: urls });
  } catch (error) {
    console.error("Error in uploadMedia:", error);
    res.status(500).send({ success: false, message: "Upload media error!" });
  }
});

// Middleware to delete media
const deleteMedia = asyncHandle(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResult = await cloudinaryDeleteMedia({
      public_id: id,
      resource_type: "image",
    });
    res.json({
      success: true,
      message: "Deleted successfully",
      result: deleteResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Delete media error!",
    });
  }
});

// Middleware to delete media by model
const deleteMediaModel = async (req, res) => {
  const { id, public_id } = req.params;
  try {
    const room = await productModel.findById(id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const mediaIndex = room.media.findIndex(
      (media) => media.public_id === public_id
    );
    if (mediaIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    const [media] = room.media.splice(mediaIndex, 1);
    await room.save();

    const deleteResult = await cloudinaryDeleteMedia({
      public_id,
      resource_type: media.resource_type,
    });
    res.json({
      success: true,
      message: "Media deleted successfully from Cloudinary and database",
      result: deleteResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting media!",
    });
  }
};

module.exports = {
  uploadMedia,
  deleteMedia,
  deleteMediaModel,
};
