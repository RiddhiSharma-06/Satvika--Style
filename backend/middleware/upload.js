import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

console.log("✅ Upload middleware loaded");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    console.log("📤 Uploading file:", file.originalname);

    return {
      folder: "satvika-payments",
      resource_type: "image",
    };
  },
});

const upload = multer({ storage });

export default upload;