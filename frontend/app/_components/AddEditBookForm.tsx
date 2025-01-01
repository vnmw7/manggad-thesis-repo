"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Author {
  firstName: string;
  lastName: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: "error" | "success";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <div
          className={`mb-4 text-lg font-semibold ${type === "error" ? "text-red-600" : "text-green-600"}`}
        >
          {type === "error" ? "Error" : "Success"}
        </div>
        <p className="mb-4 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="w-full rounded bg-[#0442B1] py-2 text-white hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const AddEditBookForm = (props: any) => {
  const [title, setTitle] = useState(props.Book?.title || "");
  const [abstract, setAbstract] = useState(props.Book?.abstract || "");
  const [keywords, setKeywords] = useState(props.Book?.keywords || "");
  const [language, setLanguage] = useState(props.Book?.language || "");
  const [yearOfSubmission, setYearOfSubmission] = useState<number | null>(
    props.Book?.yearOfSubmission || null,
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(
    props.Book?.coverImage || null,
  );
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [authors, setAuthors] = useState<Author[]>(props.Book?.authors || []);
  const [author_firstName, setAuthor_firstName] = useState("");
  const [author_lastName, setAuthor_lastName] = useState("");

  const [advisors, setAdvisors] = useState<Author[]>(props.Book?.authors || []);
  const [advisor_firstName, setAdvisor_firstName] = useState("");
  const [advisor_lastName, setAdvisor_lastName] = useState("");

  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    type: "error" as "error" | "success",
  });

  const router = useRouter();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
    if (modalState.type === "success") {
      router.push("/admin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 💬[VINCENT]: gn remove ko anay ang validation para hapos mag add books pang test
    // Validation checks
    // if (authors.length === 0) {
    //   setModalState({
    //     isOpen: true,
    //     message: "Please add at least one author",
    //     type: "error",
    //   });
    //   return;
    // }

    // if (advisors.length === 0) {
    //   setModalState({
    //     isOpen: true,
    //     message: "Please add at least one advisor",
    //     type: "error",
    //   });
    //   return;
    // }

    const newBook = {
      id: props.Book?.id,
      title,
      abstract,
      language,
      keywords,
      yearOfSubmission,
      authors,
      advisors,
      coverImage: selectedImage,
    };

    try {
      const response = await fetch("http://localhost:3001/books/addEdit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        setModalState({
          isOpen: true,
          message: "Book added successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      setModalState({
        isOpen: true,
        message: "An error occurred while adding the book",
        type: "error",
      });
    }

    // upload pdf file sa backend kng may ara
    if (pdfFile) {
      const formData = new FormData();
      formData.append("pdf", pdfFile);

      const res = await fetch("http://localhost:3001/upload/pdf", {
        method: "POST",
        body: formData,
      });

      const responseFromServer = await res.json();
      console.log(responseFromServer);
    }
  };

  const addAuthor = () => {
    if (author_firstName && author_lastName) {
      setAuthors([
        ...authors,
        { firstName: author_firstName, lastName: author_lastName },
      ]);
      setAuthor_firstName("");
      setAuthor_lastName("");
    } else {
      setModalState({
        isOpen: true,
        message: "Both first name and last name are required for authors.",
        type: "error",
      });
    }
  };

  const removeAuthor = (removeIndex: number) => {
    const newArray = authors.filter(
      (_, authorIndex) => removeIndex !== authorIndex,
    );
    setAuthors(newArray);
  };

  const addAdvisor = () => {
    if (advisor_firstName && advisor_lastName) {
      setAdvisors([
        ...advisors,
        { firstName: advisor_firstName, lastName: advisor_lastName },
      ]);
      setAdvisor_firstName("");
      setAdvisor_lastName("");
    } else {
      setModalState({
        isOpen: true,
        message: "Both first name and last name are required for advisors.",
        type: "error",
      });
    }
  };

  const removeAdvisor = (removeIndex: number) => {
    const newArray = advisors.filter(
      (_, advisorIndex) => removeIndex !== advisorIndex,
    );
    setAdvisors(newArray);
  };

  return (
    <div className="mx-auto max-w-full rounded-lg p-6">
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        message={modalState.message}
        type={modalState.type}
      />
      <div className="flex items-start gap-8">
        {/* Form Section */}
        <form className="flex-1" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-2xl font-semibold"> {props.heading} </h2>
          <div className="mb-4">
            <input
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Authors Section */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Author(s):
            </label>
            <div className="flex gap-2">
              <input
                className="mt-1 flex-1 rounded border border-gray-300 p-2"
                value={author_firstName}
                onChange={(e) => setAuthor_firstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                className="mt-1 flex-1 rounded border border-gray-300 p-2"
                value={author_lastName}
                onChange={(e) => setAuthor_lastName(e.target.value)}
                placeholder="Last Name"
              />
              <button
                type="button"
                onClick={addAuthor}
                className="mt-1 rounded bg-[#0442B1] px-4 py-2 text-white hover:bg-blue-600"
              >
                Add Author(s)
              </button>
            </div>
            <ul className="mt-2">
              {authors.map((author, index) => (
                <li
                  key={index}
                  className="mt-1 flex items-center justify-between"
                >
                  <span>
                    {author.firstName} {author.lastName}
                  </span>
                  <button
                    onClick={() => removeAuthor(index)}
                    type="button"
                    className="w-[510px] bg-red-700 text-white hover:bg-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Advisors Section */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Advisor(s):
            </label>
            <div className="flex gap-2">
              <input
                className="mt-1 flex-1 rounded border border-gray-300 p-2"
                value={advisor_firstName}
                onChange={(e) => setAdvisor_firstName(e.target.value)}
                placeholder="First Name"
              />
              <input
                className="mt-1 flex-1 rounded border border-gray-300 p-2"
                value={advisor_lastName}
                onChange={(e) => setAdvisor_lastName(e.target.value)}
                placeholder="Last Name"
              />
              <button
                type="button"
                onClick={addAdvisor}
                className="mt-1 rounded bg-[#0442B1] px-4 py-2 text-white hover:bg-blue-600"
              >
                Add Advisor(s)
              </button>
            </div>
            <ul className="mt-2">
              {advisors.map((advisor, index) => (
                <li
                  key={index}
                  className="mt-1 flex items-center justify-between"
                >
                  <span>
                    {advisor.firstName} {advisor.lastName}
                  </span>
                  <button
                    onClick={() => removeAdvisor(index)}
                    type="button"
                    className="w-[510px] bg-red-700 text-white hover:bg-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Fields */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Abstract:</label>
            <textarea
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Language:</label>
            <input
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Keywords:</label>
            <input
              className="mt-1 w-full rounded border border-gray-300 p-2"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Published Year:
            </label>
            <input
              className="mt-1 w-full rounded border border-gray-300 p-2"
              type="number"
              min="2010"
              max="3000"
              value={yearOfSubmission ?? ""}
              onChange={(e) => setYearOfSubmission(parseInt(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded bg-[#0442B1] py-2 text-white hover:bg-blue-600"
          >
            Add Book
          </button>
        </form>

        {/* Image Upload Section */}
        <div className="flex w-72 flex-col items-center">
          <div
            className="mb-4 h-96 w-full rounded bg-cover bg-center shadow-md"
            style={{
              backgroundImage: `url(${selectedImage || "/defaults/defaultBookCover.png"})`,
            }}
          ></div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded bg-[#0442B1] py-2 text-white hover:bg-blue-600"
          >
            Choose Cover Image
          </button>
          <div className="mt-2">
            <label
              htmlFor="pdf-upload"
              className="mb-1 block font-medium text-gray-700"
            >
              Upload PDF:
            </label>
            <input
              type="file"
              name="pdf"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full rounded border border-gray-300 p-2 file:mr-4 file:rounded file:border-0 file:bg-[#0442B1] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600" // Tailwind styles
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBookForm;
