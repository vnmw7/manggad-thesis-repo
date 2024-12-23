"use client";

import { useState } from "react";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default UploadPage;

// 'use client'

// import React, { useState } from 'react';

// const UploadPage = () => {
//     const [selectedImage, setSelectedImage] = useState<File | null>(null);
//     const [previewImage, setPreviewImage] = useState<string | null>(null);
//     const [ imageUrl, setImageUrl ] = useState<string | null>(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const [message, setMessage] = useState<string | null>(null);

//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setSelectedImage(file);
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };

//     const handleUpload = async () => {
//         if (!selectedImage) return;

//         setIsUploading(true);
//         setMessage(null);

//         const formData = new FormData();
//         formData.append('file', selectedImage);

//         try {
//             const response = await fetch('/api/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const result = await response.json();
//             setMessage(result.message || 'Upload successful');
//         } catch (error) {
//             setMessage('Upload failed');
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     const handleTestApi = async () => {  // New function to call the test API
//         try {
//             const response = await fetch('/api/test/route', { // Call your test route
//                 method: 'GET', // or 'POST' if that's how your test route is set up
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log("Test API response:", data); // Log the response data
//                 alert("Test API successful!"); // Or update the UI as needed
//             } else {
//                 console.error("Test API failed:", response.status, await response.text());
//                 alert("Test API failed!");
//             }
//         } catch (error) {
//             console.error("Error calling Test API:", error);
//             alert("Error calling Test API");
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleImageChange} accept="image/*" />

//             {previewImage && (
//                 <img
//                     src={previewImage}
//                     alt="Uploaded image"
//                     width={200}
//                     height={200}
//                     style={{ objectFit: 'cover' }}
//                 />
//             )}

//             <button onClick={handleUpload} disabled={!selectedImage || isUploading}>
//                 {isUploading ? 'Uploading...' : 'Upload'}
//             </button>

//             <button onClick={handleTestApi}>Test API</button>

//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default UploadPage;
