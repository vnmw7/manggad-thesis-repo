"use client"

import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data); // Handle success or error
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit">Upload</button>
    </form>
  );
}