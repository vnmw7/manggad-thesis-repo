"use client";

import UploadImage from "./UploadImage";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Author {
    firstName: string;
    lastName: string;
}

const AddBookForm = () => {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [keywords, setKeywords] = useState("");
    const [language, setLanguage] = useState("");
    const [yearOfSubmission, setYearOfSubmission] = useState<number | null>(null);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

    const [authors, setAuthors] = useState<Author[]>([]);
    const [author_firstName, setAuthor_firstName] = useState("");
    const [author_lastName, setAuthor_lastName] = useState("");

    const [advisors, setAdvisors] = useState<Author[]>([]);
    const [advisor_firstName, setAdvisor_firstName] = useState("");
    const [advisor_lastName, setAdvisor_lastName] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newBook = {
            title,
            abstract,
            language,
            keywords,
            yearOfSubmission,
            authors,
            advisors,
            coverImageUrl,
        };
        console.log("Sending new book:", newBook);
        try {
            const response = await fetch("http://localhost:3001/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
            });
            if (response.ok) {
                router.push("/admin");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addAuthor = () => {
        if (author_firstName && author_lastName) {
            setAuthors([...authors, { firstName: author_firstName, lastName: author_lastName }]);
            setAuthor_firstName("");
            setAuthor_lastName("");
        } else {
            alert("Both names are required.");
        }
    };

    const removeAuthor = (removeIndex: number) => {
        const newArray = authors.filter((_, authorIndex) => removeIndex !== authorIndex);
        setAuthors(newArray);
    };

    const addAdvisor = () => {
        if (advisor_firstName && advisor_lastName) {
            setAdvisors([...advisors, { firstName: advisor_firstName, lastName: advisor_lastName }]);
            setAdvisor_firstName("");
            setAdvisor_lastName("");
        } else {
            alert("Both names are required.");
        }
    };

    const removeAdvisor = (removeIndex: number) => {
        const newArray = advisors.filter((_, advisorIndex) => removeIndex !== advisorIndex);
        setAdvisors(newArray);
    };

    return (
        <div className="p-6 rounded-lg max-w-full mx-auto">
            <div className="flex gap-8 items-start">
                {/* Form Section */}
                <form className="flex-1" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-4">Add New Book / Research</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Title:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Authors Section */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Author(s):</label>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded mt-1"
                                value={author_firstName}
                                onChange={(e) => setAuthor_firstName(e.target.value)}
                                placeholder="First Name"
                            />
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded mt-1"
                                value={author_lastName}
                                onChange={(e) => setAuthor_lastName(e.target.value)}
                                placeholder="Last Name"
                            />
                            <button
                                type="button"
                                onClick={addAuthor}
                                className="bg-[#0442B1] text-white px-4 py-2 rounded mt-1 hover:bg-blue-600"
                            >
                                Add Author
                            </button>
                        </div>
                        <ul className="mt-2">
                            {authors.map((author, index) => (
                                <li key={index} className="flex justify-between items-center mt-1">
                                    <span>{author.firstName} {author.lastName}</span>
                                    <button
                                        onClick={() => removeAuthor(index)}
                                        type="button"
                                        className="text-white bg-red-700 w-[510px] hover:bg-red-500"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Advisors Section */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Advisor(s):</label>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded mt-1"
                                value={advisor_firstName}
                                onChange={(e) => setAdvisor_firstName(e.target.value)}
                                placeholder="First Name"
                            />
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded mt-1"
                                value={advisor_lastName}
                                onChange={(e) => setAdvisor_lastName(e.target.value)}
                                placeholder="Last Name"
                            />
                            <button
                                type="button"
                                onClick={addAdvisor}
                                className="bg-[#0442B1] text-white px-4 py-2 rounded mt-1 hover:bg-blue-600"
                            >
                                Add Advisor
                            </button>
                        </div>
                        <ul className="mt-2">
                            {advisors.map((advisor, index) => (
                                <li key={index} className="flex justify-between items-center mt-1">
                                    <span>{advisor.firstName} {advisor.lastName}</span>
                                    <button
                                        onClick={() => removeAdvisor(index)}
                                        type="button"
                                         className="text-white bg-red-700 w-[510px] hover:bg-red-500"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Other Fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Abstract:</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={abstract}
                            onChange={(e) => setAbstract(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Language:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Keywords:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Published Year:</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            type="number"
                            min="2010"
                            max="3000"
                            value={yearOfSubmission ?? ""}
                            onChange={(e) => setYearOfSubmission(parseInt(e.target.value))}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#0442B1] text-white py-2 rounded hover:bg-blue-600 mt-4"
                    >
                        Add Book
                    </button>
                </form>

                {/* Image Upload Section */}
                <div className="w-72 flex flex-col items-center">
                    {/* <div className="w-full h-96 bg-cover bg-center rounded shadow-md" style={{ backgroundImage: `url(${coverImageUrl ?? '/public/list.jpg'})`,}}></div> */}
                    <div className="w-full h-96 bg-cover bg-center rounded shadow-md" style={{ backgroundImage: `url(/uploads/list.jpg)`,}}></div>
                    <UploadImage onUpload={setCoverImageUrl} />
                </div>
            </div>
        </div>
    );
};

export default AddBookForm;
