// FILE: page.tsx
import { upload } from '../_api/uploadAction'

interface UploadImageProps {
    onUpload: (url: string) => void;
}

export default function UploadImage({ onUpload }: UploadImageProps) {
    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const result = await upload(formData);
        if (result.success) {
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
    )
}