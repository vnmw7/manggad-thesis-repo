"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, File, X, CheckCircle, AlertCircle } from "lucide-react";

interface FileUploadClientProps {
  id: string;
  name: string;
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  required?: boolean;
  onFileChange?: (files: File | File[]) => void;
}

const FileUploadClient: React.FC<FileUploadClientProps> = ({
  id,
  name,
  accept = "*",
  maxSize = 10, // Default 10MB
  multiple = false,
  required = false,
  onFileChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Convert maxSize from MB to bytes
  const maxSizeBytes = maxSize * 1024 * 1024;

  const validateFiles = (fileList: FileList): File[] => {
    setError(null);
    const validFiles: File[] = [];

    // Convert FileList to array and check each file
    Array.from(fileList).forEach((file) => {
      // Check file size
      if (file.size > maxSizeBytes) {
        setError(
          `File "${file.name}" exceeds the maximum size of ${maxSize}MB.`,
        );
        return;
      }

      // Check file type if accept is specified
      if (accept !== "*") {
        const acceptedTypes = accept.split(",");
        const fileType = file.name.slice(file.name.lastIndexOf("."));

        if (
          !acceptedTypes.some(
            (type) =>
              type === fileType ||
              type === file.type ||
              (type.includes("/*") &&
                file.type.startsWith(type.replace("/*", ""))),
          )
        ) {
          setError(`File "${file.name}" has an unsupported format.`);
          return;
        }
      }

      validFiles.push(file);
    });

    return validFiles;
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (multiple) {
        const validFiles = validateFiles(e.dataTransfer.files);
        setFiles((prevFiles) => {
          const newFiles = [...prevFiles, ...validFiles];
          if (onFileChange) {
            onFileChange(multiple ? newFiles : newFiles[0]);
          }
          return newFiles;
        });
      } else {
        // If not multiple, just take the first file
        if (e.dataTransfer.files[0]) {
          const dt = new DataTransfer();
          dt.items.add(e.dataTransfer.files[0]);
          const validFiles = validateFiles(dt.files);
          if (validFiles.length > 0) {
            setFiles([validFiles[0]]);
            if (onFileChange) {
              onFileChange(validFiles[0]);
            }
          }
        }
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);

      if (multiple) {
        setFiles((prevFiles) => {
          const newFiles = [...prevFiles, ...validFiles];
          if (onFileChange) {
            onFileChange(newFiles);
          }
          return newFiles;
        });
      } else if (validFiles.length > 0) {
        setFiles([validFiles[0]]);
        if (onFileChange) {
          onFileChange(validFiles[0]);
        }
      }
    }
  };
  const removeFile = (fileName: string) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);

    if (onFileChange) {
      if (multiple) {
        onFileChange(updatedFiles);
      } else {
        onFileChange(updatedFiles.length > 0 ? updatedFiles[0] : null);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="w-full">
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } cursor-pointer rounded-lg p-6 transition-all hover:bg-gray-50`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          name={name}
          accept={accept}
          multiple={multiple}
          required={required && files.length === 0}
          onChange={handleChange}
          className="hidden"
        />

        <UploadCloud
          className={`mb-2 h-12 w-12 ${
            dragActive ? "text-blue-600" : "text-gray-400"
          }`}
        />

        <p className="mb-1 text-sm font-medium text-gray-700">
          {multiple
            ? "Drop files here or click to browse"
            : "Drop file here or click to browse"}
        </p>

        <p className="text-xs text-gray-500">
          {accept !== "*"
            ? `Accepted formats: ${accept.replace(/\./g, "").toUpperCase()}`
            : "All file types accepted"}
          {" · "}
          Max size: {maxSize}MB
        </p>
      </div>

      {error && (
        <div className="mt-2 flex items-center text-sm text-red-500">
          <AlertCircle className="mr-1 h-4 w-4" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border border-gray-200 p-3"
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <File className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="max-w-[200px] truncate text-sm font-medium text-gray-700">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                  className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadClient;
