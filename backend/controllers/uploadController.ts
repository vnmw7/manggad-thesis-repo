// guide: https://www.youtube.com/watch?v=3Gj_mL9JJ6k
import cloudinary from "../utils/cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { Request, Response } from "express";

const upload = (
  file: Express.Multer.File,
  fileDestination: string,
  res: Response,
) => {
  cloudinary.uploader.upload(
    file.path,
    { folder: fileDestination, resource_type: "raw" },
    (
      error: UploadApiErrorResponse | undefined,
      result: UploadApiResponse | undefined,
    ) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }

      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    },
  );
};

const uploadPdf = async (req: Request, res: Response) => {
  if (req.file) {
    upload(req.file, "manggad/pdf", res);
  } else {
    res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
};
const uploadImg = async (req: Request, res: Response) => {
  if (req.file) {
    upload(req.file, "manggad/img", res);
  } else {
    res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
};

// Add a generic file upload handler
const uploadGenericFile = async (req: Request, res: Response) => {
  if (req.file) {
    // Determine destination based on file type or keep it generic
    const destinationFolder = `manggad/${
      req.file.mimetype.split("/")[0] || "other" // e.g., manggad/image, manggad/application, manggad/other
    }`;
    upload(req.file, destinationFolder, res);
  } else {
    res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
};

export const uploadController = {
  uploadPdf,
  uploadImg,
  uploadGenericFile, // Export the new handler
};
