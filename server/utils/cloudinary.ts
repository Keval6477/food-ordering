import { v2 as cloudinary, v2 } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;

export const uploadImageOnCloudinary = async (file: Express.Multer.File) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.uploader.upload(dataUri);
  return uploadResponse.secure_url;
};
