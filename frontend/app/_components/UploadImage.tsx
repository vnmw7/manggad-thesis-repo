import { upload } from "../_api/uploadAction";

// Define the props interface for the UploadImage component
interface UploadImageProps {
  onUpload: (url: string) => void;
}

// Define and export the UploadImage component
export default function UploadImage({ onUpload }: UploadImageProps) {
  // Define the handleUpload function to handle form submission
  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target as HTMLFormElement); // Create a FormData object from the form
    const result = await upload(formData); // Call the upload function and wait for the result

    // If the upload is successful, call the onUpload callback with the file path
    if (result.success) {
      console.log(result.filePath_netxjs);
      onUpload(result.filePath_netxjs);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}
