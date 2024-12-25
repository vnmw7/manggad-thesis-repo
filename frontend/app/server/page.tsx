import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export default function ServerUploadPage() {
  async function upload(data: FormData) {
    "use server";

    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public/uploads"); // gamit ka process.cwd() para sa root directory tapus __dirname naman kng sa .next folder
    const filePath = join(uploadDir, file.name);

    try {
      // Ensure the upload directory exists
      await mkdir(uploadDir, { recursive: true });
      // Write the file to the filesystem
      await writeFile(filePath, new Uint8Array(buffer));
      console.log(`File uploaded successfully: ${filePath}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed");
    }

    return { success: true };
  }

  return (
    <main>
      <h1>React Server Component: Upload</h1>
      <form action={upload}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
