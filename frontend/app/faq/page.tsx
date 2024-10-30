"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FaqPage() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <nav className="w-full bg-[#0442B1] text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="MANGGAD LOGO.png"
            alt="Logo"
            className="h-14 w-14 mr-2"
          />
          <div className="text-lg font-extrabold">Manggad</div>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex space-x-5">
            <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/home")}>Home</a>
            <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/about")}>About</a>
            <a className="hover:underline cursor-pointer text-lg" onClick={() => router.push("/contact")}>Contact</a>
          </div>
          <div className="border-l border-white h-10 mx-4"></div>
          <div className="flex items-center space-x-4">
            <div className="font-mono text-lg text-right">
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>
            <button
              className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => console.log("Login as admin")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c2.485 0 4.5-2.015 4.5-4.5S14.485 2 12 2 7.5 4.015 7.5 6.5 9.515 11 12 11zM4 20c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="w-full">
        <img
          src="Librarysample.jpg"
          alt="Banner"
          className="w-full object-cover h-[200px]"
        />
      </div>

      <div className="flex flex-1 ml-4">
        <div className="w-[250px] h-[428px] bg-white p-4 border rounded-lg mt-5">
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("browse")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2"
            >
              Browse
            </button>
            {openDropdown === "browse" && (
              <ul className="space-y-1">
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/collection")}>Collections</a></li>
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/discipline")}>Disciplines</a></li>
                <li><a className="text-lg hover:underline cursor-pointer" onClick={() => router.push("/author")}>Authors</a></li>
              </ul>
            )}
          </div>
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("author")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2"
            >
              Author Corner
            </button>
            {openDropdown === "author" && (
              <ul className="space-y-1">
                <li><a className="text-lg hover:underline cursor-pointer">Author FAQ</a></li>
              </ul>
            )}
          </div>
          <div className="mb-4">
            <button
              onClick={() => toggleDropdown("connect")}
              className="bg-[#0442B1] text-white text-xl font-thin p-4 w-full text-left rounded-lg mb-2"
            >
              About Manggad
            </button>
            {openDropdown === "connect" && (
              <ul className="space-y-1">
                <li><a href="#" className="text-lg hover:underline">content1</a></li>
                <li><a href="#" className="text-lg hover:underline">content2</a></li>
                <li><a href="#" className="text-lg hover:underline">content3</a></li>
                <li><a href="#" className="text-lg hover:underline">content4</a></li>
                <li><a href="#" className="text-lg hover:underline">content5</a></li>
              </ul>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Centered Search Field */}
          <div className="w-full flex justify-center mt-5">
            <form className="w-full max-w-7xl flex items-center">
              {/* Input field takes most of the width */}
              <input
                type="text"
                className="border border-gray-300 placeholder:text-[#262832] px-4 py-2 w-full text-lg"
                placeholder="Search for documents, research, and more..."
              />
              {/* Search button on the right side of the input */}
              <button className="bg-[#0442B1] transition hover:bg-blue-600 text-white px-6 py-2 text-lg ml-2 max-w-96">
                Search
              </button>
            </form>
          </div>

{/* FAQ Section */}
<div className="mt-8 flex-1 w-full">
  <h2 className="text-3xl font-semibold mb-4 text-[#0A379C] w-full max-w-7xl mx-auto">
    Frequently Asked Questions
  </h2>
  <div className="w-full max-w-7xl ml-44"> {/* Div for alignment */}
    <ul className="space-y-4">
      {[
        {
          question: "I don't have electronic versions of old working papers that I'd like to include in the repository. Is it okay to scan the printed page to a PDF file?",
          answer: "Yes--scanning printed pages is a great way to create PDF files for inclusion in the repository. There are two ways to scan a page: using OCR (Optical Character Recognition) or scanning the page as an image. Making OCR scans requires careful proofreading and loses the original formatting of the documents. Image scans cannot be searched. The best solution takes advantage of both of these methods. Many software applications allow for the OCR capture of image scans. When documents are scanned this way, users see the image scan but search the full-text of the document. This is the preferred method for scanning documents for the repository."
        },
        {
          question: "When I copy and paste abstracts into the Submit form, some formatted text reverts to plain text. What's going on?",
          answer: (
            <div>
              <p>
                When copying abstracts from a word processing file or a PDF file, and pasting the text into the submission form, you are taking text from an environment that supports fonts and text style changes. Because the abstract is intended to be presented on the web, text styles must be specified using HTML codes.
              </p>
              <p>
                If submitting an abstract in HTML format, please be sure to select the corresponding option on the submission form.
              </p>
              <p>The following HTML tags are recognized by the system and may be used to format an abstract:</p>
              <ul className="list-disc ml-8"> {/* Bullet points for HTML tags */}
                <li>&lt;p&gt; - paragraph</li>
                <li>&lt;br&gt; - line break</li>
                <li>&lt;strong&gt; - strong/bold</li>
                <li>&lt;em&gt; - italics/emphasis</li>
                <li>&lt;sub&gt; - subscript</li>
                <li>&lt;sup&gt; - superscript</li>
              </ul>
            </div>
          )
        },
        { 
          question: "How do I include accents and special characters in the abstracts and titles?", 
          answer: (
            <div>
              <p>
                The repository software supports the worldwide character set (Unicode, utf-8). Accents, symbols, and other special characters may be copied and pasted into the abstract or title field from a word processing file or typed in directly. 
              </p>
              <p>
                Windows users may also use the <strong>Character Map</strong> to insert these characters. Macintosh users may use the <strong>Character Palette</strong> (available via <strong>Edit &gt; Special Characters</strong> in the Finder).
              </p>
            </div>
          )
        },
        { 
          question: "How do I revise a submission?", 
          answer: (
            <div>
              <p>
              To revise a submission that has been posted to the repository, contact the repository administrator with the new version.
              </p>
              <p>
              If the submission has been submitted, but not yet posted, you may revise it via your <strong>My Account</strong> page: (available via <strong>Edit &gt; Special Characters</strong> in the Finder).
              </p><br></br>
              <p>1. Locate the article on your <strong>My Account</strong> page, and click the title.</p>
              <br></br>
              <p>2. Click Revise <strong>Submission</strong> from the list of options in the left sidebar.</p>
              <br></br>
              <p>3. Enter your changes in the Revise Submission form, and click Submit at the bottom of the page to submit your changes.</p> 
                <p>(You only need to modify the portion of the form that corresponds to the changes you wish to make.)</p>
            </div>
          )
        },
        { 
          question: "How can I submit a multi-part file, such as multiple chapters for a book?", 
          answer: (
            <div>
              <p>
              Combine all the sections together as one Microsoft Word file or PDF file and submit that.
              </p>
              <br></br>
              <p>
              To make one PDF file from multiple files, open the first PDF file, then choose <strong>Document</strong> &gt; <strong>Insert Pages</strong> from Acrobat's menus to insert the second file (indicate it should go after the last page of the first file), and repeat for all documents. The result will be one compound PDF file which may then be submitted.
              </p><br></br>
              <p>If you feel that the one large PDF file might be too large for some people to download, we suggest that you submit the consolidated file as the full text of the article, and then upload the separate chapters or sections of the document as <strong>Associated Files</strong>. These files will appear on the web page alongside the complete document. For more information about uploading associated files, see "Can I post related files..." below.</p>
            </div>
          )
        },
        { 
          question: "Can I post related files (sound clips, data sets, etc.) alongside the published article?", 
          answer: (
            <div>
              <p>
              Yes. The bepress system refers to these supplementary items as <strong>Associated Files</strong>. You will be prompted to submit Associated Files when you upload your submissions. The name of the files you upload will appear on the web site along with your short description of it. Viewers must have the necessary software to open your files; that is not provided by the bepress system.
              </p>
              <br></br>
              <p>
              Please be sure that there are no permissions issues related to use of the associated material. Sometimes, especially with images, you must write a letter seeking permission to use the material before it can be posted.
              </p><br></br>
              <p>Also note that where possible, items such as images, charts and tables that are referenced in the document (or otherwise an integral part of the document) should be included directly in the article itself and not posted just as associated files.</p>
            </div>
          )
        },
        { 
          question: "Can I post a reprint from a journal?", 
          answer: (
            <div>
              <p>
              Yes. The bepress system refers to these supplementary items as <strong>Associated Files</strong>. You will be prompted to submit Associated Files when you upload your submissions. The name of the files you upload will appear on the web site along with your short description of it. Viewers must have the necessary software to open your files; that is not provided by the bepress system.
              </p>
              <br></br>
              <p>
              Please be sure that there are no permissions issues related to use of the associated material. Sometimes, especially with images, you must write a letter seeking permission to use the material before it can be posted.
              </p><br></br>
              <p>Also note that where possible, items such as images, charts and tables that are referenced in the document (or otherwise an integral part of the document) should be included directly in the article itself and not posted just as associated files.</p>
            </div>
          )
        },
        // Add more FAQs here as needed
      ].map(({ question, answer }, index) => (
        <li key={index} className="ml-4"> {/* Align questions with margin */}
          <a
            className="text-lg text-[#0A379C] font-medium cursor-pointer underline"
            onClick={() => toggleQuestion(question)}
          >
            {question}
          </a>
          {openQuestion === question && (
            <div className="mt-2 text-gray-700 ml-4">{answer}</div> // Align answer with question
          )}
        </li>
      ))}
    </ul>
  </div> {/* End of added div */}
</div>
        </div>
      </div>

      <footer className="bg-[#0442B1] text-white py-4 mt-14">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} Manggad. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}


