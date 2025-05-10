/**
 * Add thesis section of the single page application
 * Client component implementation for all interactive elements
 */
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ThesisFormClient from "./ThesisFormClient";
import FileUploadClient from "./FileUploadClient";
import { CalendarIcon } from "@radix-ui/react-icons";

const departments = [
  "School of Architecture, Fine Arts, and Interior Design (SARFAID)",
  "School of Business and Information Technology (SBIT)",
  "School of Hospitality and Tourism Management (SHTM)",
  "School of Sciences, Liberal Arts, and Teacher Education (SSLATE)",
];

const programs = [
  "BS in Architecture",
  "BS in Fine Arts",
  "BS in Interior Design",
  "BS in Business Administration",
  "BS in Information Technology",
  "BS in Hospitality Management",
  "BS in Tourism Management",
  "BS in English",
  "BS in Filipino",
  "BS in Basic Education",
  "BS in Psychology",
];

const degreeLevels = ["Bachelor's", "Master's", "PhD", "Associate", "Diploma"];

const copyrightOptions = [
  "Author holds copyright",
  "Public Domain",
  "Creative Commons",
  "University holds copyright",
  "Other",
];

const licenseOptions = [
  "CC BY (Attribution)",
  "CC BY-SA (Attribution-ShareAlike)",
  "CC BY-NC (Attribution-NonCommercial)",
  "CC BY-ND (Attribution-NoDerivatives)",
  "CC BY-NC-SA (Attribution-NonCommercial-ShareAlike)",
  "CC BY-NC-ND (Attribution-NonCommercial-NoDerivatives)",
  "No License/All Rights Reserved",
];

const embargoOptions = [
  "No Embargo",
  "6 Months",
  "1 Year",
  "2 Years",
  "Custom Period",
];

// Define TypeScript interface for form data
interface ThesisFormData {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  department?: string;
  program?: string;
  degreeAwarded?: string | Date;
  abstract?: string;
  keywords?: string[];
  degreeLevel?: string;
  copyright?: string;
  thirdPartyCopyright?: string;
  confirmPermissions?: boolean;
  license?: string;
  supervisors?: string[];
  orcid?: string;
  notes?: string;
  thesis_document_url?: string; // Keep for Cloudinary URL
  supplementary_files_urls?: string[]; // Keep for Cloudinary URLs
}

// Define TypeScript interface for file uploads
interface FileUploads {
  thesisDocument: File | null;
  supplementaryFiles: File[];
}

// Define the expected structure of the Cloudinary upload response from your backend
interface CloudinaryUploadResult {
  success: boolean;
  message: string;
  data?: {
    secure_url: string;
    public_id: string;
    // Add other fields returned by your backend if needed
  };
}

const AddThesisSection = () => {
  const [formData, setFormData] = useState<ThesisFormData>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fileUploads, setFileUploads] = useState<FileUploads>({
    thesisDocument: null,
    supplementaryFiles: [],
  });
  const [agreement, setAgreement] = useState<boolean>(false);

  // Handle form input changes
  const handleInputChange = (
    name: string,
    value: string | string[] | boolean | Date | null | undefined,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file uploads  // Handle file uploads for thesis document and supplementary files
  const handleFileUpload = (name: string, files: File | File[] | null) => {
    if (name === "thesisDocument" && files instanceof File) {
      // Single thesis document file
      setFileUploads((prev) => ({ ...prev, thesisDocument: files }));
    } else if (name === "thesisDocument" && files === null) {
      // Clear thesis document
      setFileUploads((prev) => ({ ...prev, thesisDocument: null }));
    } else if (name === "supplementaryFiles" && Array.isArray(files)) {
      // Multiple supplementary files
      setFileUploads((prev) => ({ ...prev, supplementaryFiles: files }));
    } else if (name === "supplementaryFiles" && files === null) {
      // Clear supplementary files
      setFileUploads((prev) => ({ ...prev, supplementaryFiles: [] }));
    }
  }; /**
   * Uploads a single file to Cloudinary via Next.js API route
   *
   * @param file The file to upload
   * @returns The secure URL of the uploaded file, or null if upload failed
   */
  const uploadFileToCloudinary = async (file: File): Promise<string | null> => {
    // Create form data and append file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make API request to Next.js API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // Handle HTTP errors
      if (!response.ok) {
        const errorMessage = await getErrorMessageFromResponse(response);
        throw new Error(errorMessage);
      }

      // Parse successful response
      const result: CloudinaryUploadResult = await response.json();

      // Return URL if available
      if (result.success && result.data?.secure_url) {
        return result.data.secure_url;
      } else {
        throw new Error(result.message || "Upload failed, no URL returned");
      }
    } catch (error) {
      // Log and notify user of error
      console.error(`Error uploading file ${file.name}:`, error);
      toast.error(
        `Failed to upload ${file.name}. ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      return null;
    }
  };
  /**
   * Helper function to extract error message from response
   */
  const getErrorMessageFromResponse = async (
    response: Response,
  ): Promise<string> => {
    let errorMsg = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      return errorData.message || errorMsg;
    } catch {
      // If not JSON response
      return response.statusText || errorMsg;
    }
  };
  /**
   * Prepare clean data for Supabase insertion
   * Format dates, add URLs, remove UI-only fields
   */
  const prepareDataForSupabase = (
    formData: ThesisFormData,
    thesisUrl: string | null,
    suppUrls: string[],
  ) => {
    // Format date if it's a Date object
    const formattedDate =
      formData.degreeAwarded instanceof Date
        ? formData.degreeAwarded.toISOString().split("T")[0] // YYYY-MM-DD
        : typeof formData.degreeAwarded === "string"
          ? formData.degreeAwarded
          : null;

    // Create base object with all fields
    const baseData = {
      ...formData,
      degreeAwarded: formattedDate,
      keywords: formData.keywords || [],
      supervisors: formData.supervisors || [],
      thesis_document_url: thesisUrl,
      supplementary_files_urls: suppUrls,
      // Remove UI-only fields
      confirmPermissions: undefined,
    };

    // Filter out undefined values
    return Object.fromEntries(
      Object.entries(baseData).filter(([_, value]) => value !== undefined),
    ) as Omit<ThesisFormData, "confirmPermissions">;
  };

  /**
   * Save thesis data to Supabase database
   * @param cleanData The prepared thesis data to save
   * @returns The inserted data record
   */
  const saveToDatabase = async (
    cleanData: Omit<ThesisFormData, "confirmPermissions">,
  ) => {
    toast.info("Saving thesis metadata to database...");

    const { data, error } = await supabase
      .from("theses")
      .insert([cleanData])
      .select();

    if (error) {
      console.error("Supabase insertion error:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    return data;
  };

  /**
   * Upload all thesis files to Cloudinary via backend
   * @returns Object containing thesis URL and array of supplementary file URLs
   */
  const uploadAllFiles = async (): Promise<{
    thesisUrl: string | null;
    suppUrls: string[];
  }> => {
    let thesisUrl: string | null = null;
    let suppUrls: string[] = [];

    // 1. Upload thesis document
    if (fileUploads.thesisDocument) {
      toast.info("Uploading thesis document...");
      thesisUrl = await uploadFileToCloudinary(fileUploads.thesisDocument);

      if (!thesisUrl) {
        throw new Error(
          "Failed to upload thesis document. Submission cancelled.",
        );
      }

      toast.success("Thesis document uploaded successfully.");
    }

    // 2. Upload supplementary files (if any)
    if (fileUploads.supplementaryFiles.length > 0) {
      toast.info(
        `Uploading ${fileUploads.supplementaryFiles.length} supplementary file(s)...`,
      );

      // Process supplementary files concurrently
      const uploadPromises = fileUploads.supplementaryFiles.map(
        uploadFileToCloudinary,
      );
      const results = await Promise.all(uploadPromises);

      // Filter out failed uploads (null values)
      suppUrls = results.filter((url): url is string => url !== null);

      // Report upload status
      if (suppUrls.length > 0) {
        toast.success(`Uploaded ${suppUrls.length} supplementary file(s).`);
      }

      if (suppUrls.length < fileUploads.supplementaryFiles.length) {
        toast.warning("Some supplementary files failed to upload.");
      }
    }

    return { thesisUrl, suppUrls };
  }; /**
   * Validates the thesis form data
   * @returns Object with validation result and error message if any
   */
  const validateThesisData = (): {
    isValid: boolean;
    errorMessage?: string;
  } => {
    // Check agreement first
    if (!agreement) {
      return {
        isValid: false,
        errorMessage: "Please agree to the submission terms.",
      };
    }

    // Validate using separate helper methods for better organization
    const missingRequiredFields = checkRequiredFields();
    if (missingRequiredFields) {
      return { isValid: false, errorMessage: missingRequiredFields };
    }

    // Check thesis document
    if (!fileUploads.thesisDocument) {
      return {
        isValid: false,
        errorMessage: "Please upload your thesis document",
      };
    }

    // Check third-party copyright permissions
    if (
      formData.thirdPartyCopyright === "yes" &&
      !formData.confirmPermissions
    ) {
      return {
        isValid: false,
        errorMessage:
          "Please confirm you have obtained necessary permissions for third-party materials",
      };
    }

    // All validations passed
    return { isValid: true };
  };

  /**
   * Check that all required form fields are filled
   * @returns Error message if required fields are missing, or null if all fields are valid
   */
  const checkRequiredFields = (): string | null => {
    const requiredFields = [
      { key: "title", label: "Title" },
      { key: "firstName", label: "First name" },
      { key: "lastName", label: "Last name" },
      { key: "department", label: "Department" },
      { key: "program", label: "Program" },
      { key: "degreeAwarded", label: "Degree awarded date" },
      { key: "abstract", label: "Abstract" },
      { key: "degreeLevel", label: "Degree level" },
      { key: "copyright", label: "Copyright status" },
    ];

    // Check each required field
    const missingFields = requiredFields.filter(
      (field) => !formData[field.key as keyof ThesisFormData],
    );

    // Special check for keywords array
    if (!formData.keywords || formData.keywords.length === 0) {
      missingFields.push({ key: "keywords", label: "Keywords" });
    }

    // If any required fields are missing, return error message
    if (missingFields.length > 0) {
      const fieldLabels = missingFields.map((field) => field.label);
      return `Please fill in all required fields: ${fieldLabels.join(", ")}`;
    }

    return null;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set submitting state and validate form
    setIsSubmitting(true);

    const validation = validateThesisData();
    if (!validation.isValid) {
      toast.error(
        validation.errorMessage || "Please fix form errors before submitting.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Execute file uploads using the extracted method
      const { thesisUrl: thesisDocumentUrl, suppUrls: supplementaryFilesUrls } =
        await uploadAllFiles(); // Prepare clean data for database
      const cleanData = prepareDataForSupabase(
        formData,
        thesisDocumentUrl,
        supplementaryFilesUrls,
      ); // Insert data into database
      await saveToDatabase(cleanData);

      // Handle success case
      toast.success("Thesis submitted successfully!");
      console.log("Thesis submission complete");

      // Reset form state
      setFormData({});
      setFileUploads({ thesisDocument: null, supplementaryFiles: [] });
      setAgreement(false);
    } catch (error) {
      // Centralized error handling
      console.error("Submission process failed:", error);

      // Show friendly error message
      toast.error(
        `Submission failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      // Always clear submitting state
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="mb-6 text-3xl font-bold text-[#0442B1] dark:text-blue-400">
        Submit Your Thesis
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Please complete the form below to submit your thesis to the MANGGAD
        repository. Fields marked with an asterisk (*) are required.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-6">
            <h2 className="border-b border-gray-200 pb-2 text-xl font-semibold dark:border-gray-700 dark:text-white">
              Thesis Information
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Thesis Title <span className="text-red-500">*</span>
                </label>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter the full title exactly as it appears on your thesis
                  document.
                </p>
                <ThesisFormClient
                  type="titleInput"
                  id="title"
                  name="title"
                  required={true}
                  onChange={(value: string) =>
                    handleInputChange("title", value)
                  } // Explicit type
                  value={formData.title || ""}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block font-medium text-gray-700 dark:text-gray-200"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <ThesisFormClient
                    type="input"
                    id="firstName"
                    name="firstName"
                    required={true}
                    onChange={(value: string) =>
                      handleInputChange("firstName", value)
                    } // Explicit type
                    value={formData.firstName || ""}
                  />
                </div>

                <div>
                  <label
                    htmlFor="middleName"
                    className="block font-medium text-gray-700 dark:text-gray-200"
                  >
                    Middle Name/Initial
                  </label>
                  <ThesisFormClient
                    type="input"
                    id="middleName"
                    name="middleName"
                    required={false}
                    onChange={(value: string) =>
                      handleInputChange("middleName", value)
                    } // Explicit type
                    value={formData.middleName || ""}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block font-medium text-gray-700 dark:text-gray-200"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <ThesisFormClient
                    type="input"
                    id="lastName"
                    name="lastName"
                    required={true}
                    onChange={(value: string) =>
                      handleInputChange("lastName", value)
                    } // Explicit type
                    value={formData.lastName || ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="department"
                    className="block font-medium text-gray-700 dark:text-gray-200"
                  >
                    Department <span className="text-red-500">*</span>
                  </label>
                  <ThesisFormClient
                    type="select"
                    id="department"
                    name="department"
                    options={departments}
                    required={true}
                    onChange={(value: string) =>
                      handleInputChange("department", value)
                    } // Explicit type
                    value={formData.department || ""}
                  />
                </div>

                <div>
                  <label
                    htmlFor="program"
                    className="block font-medium text-gray-700 dark:text-gray-200"
                  >
                    Program <span className="text-red-500">*</span>
                  </label>
                  <ThesisFormClient
                    type="select"
                    id="program"
                    name="program"
                    options={programs}
                    required={true}
                    onChange={(value: string) =>
                      handleInputChange("program", value)
                    } // Explicit type
                    value={formData.program || ""}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="degreeAwarded"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Date of Degree Awarded <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <ThesisFormClient
                    type="datePicker"
                    id="degreeAwarded"
                    name="degreeAwarded"
                    required={true}
                    icon={<CalendarIcon className="h-4 w-4" />}
                    onChange={(
                      value: Date | string | null | undefined, // Allow string for potential initial value
                    ) => handleInputChange("degreeAwarded", value)}
                    value={formData.degreeAwarded}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="abstract"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Abstract <span className="text-red-500">*</span>
                </label>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  Provide a concise summary of your thesis (recommended word
                  limit: 350 words).
                </p>
                <ThesisFormClient
                  type="textarea"
                  id="abstract"
                  name="abstract"
                  required={true}
                  onChange={(value: string) =>
                    handleInputChange("abstract", value)
                  } // Explicit type
                  value={formData.abstract || ""}
                />
              </div>

              <div>
                <label
                  htmlFor="keywords"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Keywords <span className="text-red-500">*</span>
                </label>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter relevant keywords separated by commas (lowercase, plural
                  preferred).
                </p>
                <ThesisFormClient
                  type="keywordsInput"
                  id="keywords"
                  name="keywords"
                  required={true}
                  onChange={(value: string[]) =>
                    handleInputChange("keywords", value)
                  } // Explicit type
                  value={formData.keywords || []}
                />
              </div>

              <div>
                <label
                  htmlFor="degreeLevel"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Degree Level <span className="text-red-500">*</span>
                </label>
                <ThesisFormClient
                  type="select"
                  id="degreeLevel"
                  name="degreeLevel"
                  options={degreeLevels}
                  required={true}
                  onChange={(value: string) =>
                    handleInputChange("degreeLevel", value)
                  } // Explicit type
                  value={formData.degreeLevel || ""}
                />
              </div>
            </div>
            <h2 className="border-b border-gray-200 pt-4 pb-2 text-xl font-semibold dark:border-gray-700 dark:text-white">
              Rights Management
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="copyright"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Copyright Status <span className="text-red-500">*</span>
                </label>
                <ThesisFormClient
                  type="select"
                  id="copyright"
                  name="copyright"
                  options={copyrightOptions}
                  required={true}
                  onChange={(value: string) =>
                    handleInputChange("copyright", value)
                  } // Explicit type
                  value={formData.copyright || ""}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-200">
                  Third-Party Copyrighted Materials{" "}
                  <span className="text-red-500">*</span>
                </label>
                <ThesisFormClient
                  type="radio"
                  name="thirdPartyCopyright"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  required={true}
                  onChange={(
                    value: string, // Explicit type
                  ) => handleInputChange("thirdPartyCopyright", value)}
                  value={formData.thirdPartyCopyright || ""}
                />
              </div>

              <div>
                <ThesisFormClient
                  type="checkbox"
                  id="confirmPermissions"
                  name="confirmPermissions"
                  label="I confirm that I have obtained all necessary permissions for any third-party copyrighted materials included in my thesis."
                  required={false}
                  conditional={true}
                  dependsOn="thirdPartyCopyright"
                  dependsOnValue="yes"
                  onChange={(
                    value: boolean, // Explicit type
                  ) => handleInputChange("confirmPermissions", value)}
                  checked={formData.confirmPermissions || false}
                />
              </div>

              <div>
                <label
                  htmlFor="license"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  License
                </label>
                <ThesisFormClient
                  type="select"
                  id="license"
                  name="license"
                  options={licenseOptions}
                  required={false}
                  onChange={(value: string) =>
                    handleInputChange("license", value)
                  } // Explicit type
                  value={formData.license || ""}
                />
              </div>
            </div>
            <h2 className="border-b border-gray-200 pt-4 pb-2 text-xl font-semibold dark:border-gray-700 dark:text-white">
              Additional Information
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="supervisors"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Supervisor(s)
                </label>
                <ThesisFormClient
                  type="multipleEntries"
                  id="supervisors"
                  name="supervisors"
                  placeholder="Add a supervisor"
                  required={false}
                  onChange={(value: string[]) =>
                    handleInputChange("supervisors", value)
                  } // Explicit type
                  value={formData.supervisors || []}
                />
              </div>
              <div>
                <label
                  htmlFor="orcid"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  ORCID iD
                </label>
                <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter your 16-digit ORCID iD (optional).
                </p>
                <ThesisFormClient
                  type="input"
                  id="orcid"
                  name="orcid"
                  pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]"
                  placeholder="0000-0000-0000-0000"
                  required={false}
                  onChange={(value: string) =>
                    handleInputChange("orcid", value)
                  } // Explicit type
                  value={formData.orcid || ""}
                />
              </div>
              <div>
                <label
                  htmlFor="notes"
                  className="block font-medium text-gray-700 dark:text-gray-200"
                >
                  Notes
                </label>
                <ThesisFormClient
                  type="textarea"
                  id="notes"
                  name="notes"
                  required={false}
                  onChange={(value: string) =>
                    handleInputChange("notes", value)
                  } // Explicit type
                  value={formData.notes || ""}
                />
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-6">
            <h2 className="border-b border-gray-200 pb-2 text-xl font-semibold dark:border-gray-700 dark:text-white">
              Upload Files
            </h2>
            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
                Thesis Document <span className="text-red-500">*</span>
              </label>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Upload your thesis document in PDF format. Maximum file size:
                50MB.
              </p>
              <FileUploadClient
                id="thesisDocument"
                name="thesisDocument"
                accept=".pdf"
                maxSize={50}
                required={true}
                onFileChange={(
                  files: File | File[] | null, // Explicit type
                ) => handleFileUpload("thesisDocument", files)}
              />
            </div>
            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
                Supplementary Files
              </label>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Upload any supplementary files (e.g., images, videos, datasets)
                that accompany your thesis. Maximum file size: 100MB total.
              </p>
              <FileUploadClient
                id="supplementaryFiles"
                name="supplementaryFiles"
                accept=".zip,.rar,.7z,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.xlsx,.docx,.csv,.json"
                maxSize={100}
                multiple={true}
                required={false}
                onFileChange={(
                  files: File | File[] | null, // Explicit type
                ) => handleFileUpload("supplementaryFiles", files)}
              />
            </div>
            <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <h3 className="mb-2 text-lg font-medium dark:text-white">
                Submission Agreement
              </h3>
              <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300">
                {/* Add your submission agreement text here */}
                <p>
                  By submitting this form, you agree to the terms and conditions
                  of the MANGGAD repository...
                </p>
              </div>
              <div className="mt-4">
                <ThesisFormClient
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                  label="I have read and agree to the repository's submission agreement."
                  required={true}
                  onChange={(value: boolean) => setAgreement(value)} // Explicit type
                  checked={agreement || false}
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting || !agreement} // Disable if submitting or agreement not checked
                className="w-full rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Thesis"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddThesisSection;
