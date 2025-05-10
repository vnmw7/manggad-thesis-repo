import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Define types for Cloudinary responses
interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  width?: number;
  height?: number;
  bytes: number;
  created_at: string;
  [key: string]: any; // For other properties returned by Cloudinary
}

interface CloudinaryError {
  message: string;
  name: string;
  http_code?: number;
  [key: string]: any; // For other error properties
}

export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 },
      );
    }

    // Convert File to buffer for Cloudinary
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Convert buffer to base64 for Cloudinary
    const fileBase64 = buffer.toString("base64");
    const fileUri = `data:${file.type};base64,${fileBase64}`;

    // Determine folder based on file type
    let folder = "manggad/other";
    const fileType = file.type.split("/")[0]; // e.g., 'image', 'application'

    if (fileType === "application" && file.name.endsWith(".pdf")) {
      folder = "manggad/pdf";
    } else if (fileType === "image") {
      folder = "manggad/img";
    } // Upload to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader.upload(
          fileUri,
          {
            folder,
            resource_type: "auto", // Auto-detect resource type
          },
          (
            error: CloudinaryError | undefined,
            result: CloudinaryUploadResult | undefined,
          ) => {
            if (error) reject(error);
            else if (result) resolve(result);
            else reject(new Error("No result returned from Cloudinary"));
          },
        );
      },
    );

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 },
    );
  }
}

// Increase payload size limit
export const config = {
  api: {
    bodyParser: false, // Disables the default body parser
    responseLimit: "50mb",
  },
};
