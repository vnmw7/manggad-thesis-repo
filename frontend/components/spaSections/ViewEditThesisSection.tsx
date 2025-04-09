/**
 * View and Edit Thesis section of the single page application
 * Component for viewing thesis entries and editing them
 */

import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";

// Mock data for thesis entries - in a real app, this would come from an API call
const mockTheses = [
  {
    id: "1",
    title:
      "The Impact of Climate Change on Coastal Communities in the Philippines",
    author: "Maria Santos",
    department:
      "School of Sciences, Liberal Arts, and Teacher Education (SSLATE)",
    program: "BS in Environmental Science",
    dateSubmitted: "2024-03-15",
    abstract:
      "This study examines the effects of rising sea levels on coastal communities...",
    keywords: [
      "climate change",
      "coastal communities",
      "adaptation strategies",
      "Philippines",
    ],
  },
  {
    id: "2",
    title:
      "Machine Learning Algorithms for Predicting Student Performance in Online Learning Environments",
    author: "Juan Dela Cruz",
    department: "School of Business and Information Technology (SBIT)",
    program: "BS in Information Technology",
    dateSubmitted: "2024-02-28",
    abstract:
      "This research explores the application of various machine learning algorithms...",
    keywords: [
      "machine learning",
      "education",
      "online learning",
      "student performance",
    ],
  },
  {
    id: "3",
    title: "Sustainable Tourism Practices in Negros Occidental: A Case Study",
    author: "Anna Reyes",
    department: "School of Hospitality and Tourism Management (SHTM)",
    program: "BS in Tourism Management",
    dateSubmitted: "2024-01-20",
    abstract:
      "This case study investigates sustainable tourism practices implemented...",
    keywords: [
      "sustainable tourism",
      "Negros Occidental",
      "ecotourism",
      "local communities",
    ],
  },
];

const ViewEditThesisSection = () => {
  const [theses, setTheses] = useState(mockTheses);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedThesisId, setExpandedThesisId] = useState<string | null>(null);
  const [editingThesisId, setEditingThesisId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    author: "",
    department: "",
    program: "",
    abstract: "",
    keywords: [] as string[],
  });

  // Filter theses based on search term
  const filteredTheses = theses.filter(
    (thesis) =>
      thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thesis.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  // Function to handle expanding a thesis for detailed view
  const handleExpand = (thesisId: string) => {
    setExpandedThesisId(expandedThesisId === thesisId ? null : thesisId);
    setEditingThesisId(null); // Close any open edit form
  };

  // Function to handle editing a thesis
  const handleEdit = (thesis: any) => {
    setEditingThesisId(thesis.id);
    setEditFormData({
      title: thesis.title,
      author: thesis.author,
      department: thesis.department,
      program: thesis.program,
      abstract: thesis.abstract,
      keywords: [...thesis.keywords],
    });
    setExpandedThesisId(thesis.id); // Expand the thesis when editing
  };

  // Function to handle deleting a thesis (with confirmation)
  const handleDelete = (thesisId: string) => {
    if (window.confirm("Are you sure you want to delete this thesis?")) {
      setTheses(theses.filter((thesis) => thesis.id !== thesisId));
    }
  };

  // Function to handle form input changes
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Function to handle keywords input changes
  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywordsArray = e.target.value.split(",").map((k) => k.trim());
    setEditFormData({
      ...editFormData,
      keywords: keywordsArray,
    });
  };

  // Function to save edited thesis
  const handleSave = (thesisId: string) => {
    setTheses(
      theses.map((thesis) =>
        thesis.id === thesisId
          ? {
              ...thesis,
              title: editFormData.title,
              author: editFormData.author,
              department: editFormData.department,
              program: editFormData.program,
              abstract: editFormData.abstract,
              keywords: editFormData.keywords,
            }
          : thesis,
      ),
    );
    setEditingThesisId(null);
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-[#0442B1]">
        Manage Thesis Entries
      </h1>
      <p className="mb-6 text-gray-600">
        View, search, and edit thesis entries in the MANGGAD repository.
      </p>

      {/* Search Bar */}
      <div className="mb-6 flex items-center rounded-lg border border-gray-300 bg-white p-2">
        <FaSearch className="mr-2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, author or keywords..."
          className="w-full border-0 focus:ring-0 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Thesis List */}
      <div className="space-y-4">
        {filteredTheses.length > 0 ? (
          filteredTheses.map((thesis) => (
            <div
              key={thesis.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#0442B1]">
                  {thesis.title}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExpand(thesis.id)}
                    className="rounded-full bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                    title="View details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(thesis)}
                    className="rounded-full bg-amber-50 p-2 text-amber-600 hover:bg-amber-100"
                    title="Edit thesis"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(thesis.id)}
                    className="rounded-full bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    title="Delete thesis"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <p className="text-gray-600">
                <span className="font-medium">Author:</span> {thesis.author}
              </p>

              <div className="mt-2 flex flex-wrap gap-1">
                {thesis.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Expanded View */}
              {expandedThesisId === thesis.id && (
                <div className="mt-4 border-t pt-4">
                  {editingThesisId === thesis.id ? (
                    /* Edit Form */
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="title"
                          className="block font-medium text-gray-700"
                        >
                          Thesis Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editFormData.title}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="author"
                          className="block font-medium text-gray-700"
                        >
                          Author
                        </label>
                        <input
                          type="text"
                          id="author"
                          name="author"
                          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editFormData.author}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="department"
                          className="block font-medium text-gray-700"
                        >
                          Department
                        </label>
                        <select
                          id="department"
                          name="department"
                          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editFormData.department}
                          onChange={handleFormChange}
                        >
                          <option value="School of Architecture, Fine Arts, and Interior Design (SARFAID)">
                            School of Architecture, Fine Arts, and Interior
                            Design (SARFAID)
                          </option>
                          <option value="School of Business and Information Technology (SBIT)">
                            School of Business and Information Technology (SBIT)
                          </option>
                          <option value="School of Hospitality and Tourism Management (SHTM)">
                            School of Hospitality and Tourism Management (SHTM)
                          </option>
                          <option value="School of Sciences, Liberal Arts, and Teacher Education (SSLATE)">
                            School of Sciences, Liberal Arts, and Teacher
                            Education (SSLATE)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="program"
                          className="block font-medium text-gray-700"
                        >
                          Program
                        </label>
                        <input
                          type="text"
                          id="program"
                          name="program"
                          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editFormData.program}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="abstract"
                          className="block font-medium text-gray-700"
                        >
                          Abstract
                        </label>
                        <textarea
                          id="abstract"
                          name="abstract"
                          rows={4}
                          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editFormData.abstract}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="keywords"
                          className="block font-medium text-gray-700"
                        >
                          Keywords (comma-separated)
                        </label>
                        <input
                          type="text"
                          id="keywords"
                          name="keywords"
                          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={editFormData.keywords.join(", ")}
                          onChange={handleKeywordsChange}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                          onClick={() => handleSave(thesis.id)}
                        >
                          <FaSave /> Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Detailed View */
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Department:</h3>
                        <p>{thesis.department}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Program:</h3>
                        <p>{thesis.program}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Date Submitted:</h3>
                        <p>{thesis.dateSubmitted}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Abstract:</h3>
                        <p className="whitespace-pre-line">{thesis.abstract}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Actions:</h3>
                        <div className="mt-2 flex space-x-2">
                          <button
                            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            onClick={() =>
                              alert("Downloading thesis document...")
                            }
                          >
                            Download Document
                          </button>
                          <button
                            className="rounded-md border border-blue-600 bg-white px-4 py-2 text-blue-600 hover:bg-blue-50"
                            onClick={() => alert("Viewing full details...")}
                          >
                            View Full Details
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
            No theses found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewEditThesisSection;
