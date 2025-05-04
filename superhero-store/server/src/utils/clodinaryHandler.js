import fs from "fs";
import { cloudinary } from "../config/cloudinary";

const cloudinaryUpload = async (LocalFilePath) => {
  try {
    //If file is not exits in the local path then return null
    if (!LocalFilePath) return null;

    //Upload file on cloudinary
    const response = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
    });

    //file has been upload successfull
    // console.log("File uploaded successfully !!! URL : ", response.url)

    fs.unlinkSync(LocalFilePath);
    //return response to the user
    return response;
  } catch (error) {
    //It unlinked file from the  local system before sending it to the server
    fs.unlinkSync(LocalFilePath);

    return null;
  }
};

export { cloudinaryUpload };
