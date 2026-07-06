const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

try {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "resumes",
      resource_type: "raw",
    },
  });

  const upload = multer({ storage });

  module.exports = upload;
} catch (error) {
  console.error("CLOUDINARY STORAGE ERROR:");
  console.error(error);
}