/**
 * Add thesis section of the single page application
 * Server component implementation with client components for interactive elements
 */

import { FaRegCalendarAlt as CalendarIcon } from "react-icons/fa";
import ThesisFormClient from "./ThesisFormClient";
import FileUploadClient from "./FileUploadClient";

const universities = [
  "La Consolacion College Bacolod",
  "University of St. La Salle",
  "University of Negros Occidental-Recoletos",
  "Carlos Hilado Memorial State University",
  "West Negros University",
  "STI West Negros University",
  "Colegio San Agustin-Bacolod",
  "Other",
];

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

const AddThesisSection = () => {
  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-[#0442B1]">
        Submit Your Thesis
      </h1>
      <p className="mb-6 text-gray-600">
        Please complete the form below to submit your thesis to the MANGGAD
        repository. Fields marked with an asterisk (*) are required.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Form Section */}
        <div className="space-y-6">
          <h2 className="border-b pb-2 text-xl font-semibold">
            Thesis Information
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block font-medium text-gray-700"
              >
                Thesis Title <span className="text-red-500">*</span>
              </label>
              <p className="mb-1 text-xs text-gray-500">
                Enter the full title exactly as it appears on your thesis
                document.
              </p>
              <ThesisFormClient
                type="titleInput"
                id="title"
                name="title"
                required={true}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-medium text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <ThesisFormClient
                  type="input"
                  id="firstName"
                  name="firstName"
                  required={true}
                />
              </div>

              <div>
                <label
                  htmlFor="middleName"
                  className="block font-medium text-gray-700"
                >
                  Middle Name/Initial
                </label>
                <ThesisFormClient
                  type="input"
                  id="middleName"
                  name="middleName"
                  required={false}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block font-medium text-gray-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <ThesisFormClient
                  type="input"
                  id="lastName"
                  name="lastName"
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="university"
                className="block font-medium text-gray-700"
              >
                University <span className="text-red-500">*</span>
              </label>
              <ThesisFormClient
                type="select"
                id="university"
                name="university"
                options={universities}
                required={true}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="department"
                  className="block font-medium text-gray-700"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <ThesisFormClient
                  type="select"
                  id="department"
                  name="department"
                  options={departments}
                  required={true}
                />
              </div>

              <div>
                <label
                  htmlFor="program"
                  className="block font-medium text-gray-700"
                >
                  Program <span className="text-red-500">*</span>
                </label>
                <ThesisFormClient
                  type="select"
                  id="program"
                  name="program"
                  options={programs}
                  required={true}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="degreeAwarded"
                className="block font-medium text-gray-700"
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
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="abstract"
                className="block font-medium text-gray-700"
              >
                Abstract <span className="text-red-500">*</span>
              </label>
              <p className="mb-1 text-xs text-gray-500">
                Provide a concise summary of your thesis (recommended word
                limit: 350 words).
              </p>
              <ThesisFormClient
                type="textarea"
                id="abstract"
                name="abstract"
                required={true}
              />
            </div>

            <div>
              <label
                htmlFor="keywords"
                className="block font-medium text-gray-700"
              >
                Keywords <span className="text-red-500">*</span>
              </label>
              <p className="mb-1 text-xs text-gray-500">
                Enter relevant keywords separated by commas (lowercase, plural
                preferred).
              </p>
              <ThesisFormClient
                type="keywordsInput"
                id="keywords"
                name="keywords"
                required={true}
              />
            </div>

            <div>
              <label
                htmlFor="degreeLevel"
                className="block font-medium text-gray-700"
              >
                Degree Level <span className="text-red-500">*</span>
              </label>
              <ThesisFormClient
                type="select"
                id="degreeLevel"
                name="degreeLevel"
                options={degreeLevels}
                required={true}
              />
            </div>
          </div>

          <h2 className="border-b pt-4 pb-2 text-xl font-semibold">
            Rights Management
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="copyright"
                className="block font-medium text-gray-700"
              >
                Copyright Status <span className="text-red-500">*</span>
              </label>
              <ThesisFormClient
                type="select"
                id="copyright"
                name="copyright"
                options={copyrightOptions}
                required={true}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
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
              />
            </div>

            <div>
              <label
                htmlFor="license"
                className="block font-medium text-gray-700"
              >
                License
              </label>
              <ThesisFormClient
                type="select"
                id="license"
                name="license"
                options={licenseOptions}
                required={false}
              />
            </div>

            <div>
              <label
                htmlFor="embargo"
                className="block font-medium text-gray-700"
              >
                Embargo Option
              </label>
              <p className="mb-1 text-xs text-gray-500">
                Select an embargo period (if desired) for delaying the public
                release of your thesis.
              </p>
              <ThesisFormClient
                type="select"
                id="embargo"
                name="embargo"
                options={embargoOptions}
                required={false}
              />
            </div>
          </div>

          <h2 className="border-b pt-4 pb-2 text-xl font-semibold">
            Additional Information
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="supervisors"
                className="block font-medium text-gray-700"
              >
                Thesis Supervisor(s)
              </label>
              <ThesisFormClient
                type="multipleEntries"
                id="supervisors"
                name="supervisors"
                placeholder="Add a supervisor"
                required={false}
              />
            </div>

            <div>
              <label
                htmlFor="committee"
                className="block font-medium text-gray-700"
              >
                Committee Members
              </label>
              <ThesisFormClient
                type="multipleEntries"
                id="committee"
                name="committee"
                placeholder="Add a committee member"
                required={false}
              />
            </div>

            <div>
              <label
                htmlFor="orcid"
                className="block font-medium text-gray-700"
              >
                ORCID iD
              </label>
              <p className="mb-1 text-xs text-gray-500">
                Enter your ORCID iD (if you have one).
              </p>
              <ThesisFormClient
                type="input"
                id="orcid"
                name="orcid"
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]"
                placeholder="0000-0000-0000-0000"
                required={false}
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block font-medium text-gray-700"
              >
                Additional Notes or Acknowledgements
              </label>
              <ThesisFormClient
                type="textarea"
                id="notes"
                name="notes"
                required={false}
              />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-6">
          <h2 className="border-b pb-2 text-xl font-semibold">Upload Files</h2>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Thesis Document <span className="text-red-500">*</span>
            </label>
            <p className="mb-4 text-sm text-gray-500">
              Upload your thesis document in PDF format. Maximum file size:
              50MB.
            </p>
            <FileUploadClient
              id="thesisDocument"
              name="thesisDocument"
              accept=".pdf"
              maxSize={50}
              required={true}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Supplementary Files
            </label>
            <p className="mb-4 text-sm text-gray-500">
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
            />
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-medium">Submission Agreement</h3>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                By submitting this thesis, you agree to the following terms:
              </p>
              <ul className="list-disc pl-5">
                <li>The submitted thesis is your original work</li>
                <li>
                  You have the right to grant the repository the rights to
                  preserve and distribute your work
                </li>
                <li>
                  The repository will make your work available according to the
                  license you have selected
                </li>
                <li>
                  You understand that once your thesis is published, it becomes
                  part of the permanent scholarly record
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <ThesisFormClient
                type="checkbox"
                id="agreement"
                name="agreement"
                label="I have read and agree to the repository's submission agreement."
                required={true}
              />
            </div>
          </div>

          <div className="mt-8">
            <ThesisFormClient type="submitButton" label="Submit Thesis" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddThesisSection;
