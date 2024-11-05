// FILE: page.tsx
import { upload } from './uploadAction'

export default function UploadImage() {
    return (
        <div>
            <form action={upload}>
                <input type="file" name="file" />
                <input type="submit" value="Upload" />
            </form>
        </div>
    )
}