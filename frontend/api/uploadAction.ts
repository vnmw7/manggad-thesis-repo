"use server";

export interface UploadResult {
  success: boolean;
  filePath_netxjs?: string;
  message?: string;
  error?: string;
}

export async function upload(formData: FormData): Promise<UploadResult> {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return {
        success: false,
        error: "No file provided",
      };
    }

    // Create a new FormData for the API call
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    // Call the existing upload API route
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/upload`,
      {
        method: "POST",
        body: uploadFormData,
      },
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success && result.data?.secure_url) {
      return {
        success: true,
        filePath_netxjs: result.data.secure_url,
      };
    } else {
      return {
        success: false,
        error: result.message || "Upload failed",
      };
    }
  } catch (error) {
    console.error("Upload action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
