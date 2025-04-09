"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { X, Plus, Check } from "lucide-react";

interface ThesisFormClientProps {
  type:
    | "input"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "datePicker"
    | "multipleEntries"
    | "keywordsInput"
    | "titleInput"
    | "submitButton";
  id?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  options?: string[] | { value: string; label: string }[];
  label?: string;
  conditional?: boolean;
  dependsOn?: string;
  dependsOnValue?: string;
  icon?: React.ReactNode;
}

const ThesisFormClient: React.FC<ThesisFormClientProps> = ({
  type,
  id,
  name,
  required = false,
  placeholder,
  pattern,
  options = [],
  label,
  conditional = false,
  dependsOn,
  dependsOnValue,
  icon,
}) => {
  const [value, setValue] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [entries, setEntries] = useState<string[]>([]);
  const [entryText, setEntryText] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(!conditional);

  const inputRef = useRef<HTMLInputElement>(null);

  // Effect for conditional visibility
  useEffect(() => {
    if (conditional && dependsOn) {
      const element = document.querySelector(
        `[name="${dependsOn}"]`,
      ) as HTMLInputElement;
      if (element) {
        const handleChange = () => {
          if (element.type === "radio") {
            // For radio buttons
            const radioGroup = document.querySelectorAll(
              `[name="${dependsOn}"]`,
            ) as NodeListOf<HTMLInputElement>;
            const checkedRadio = Array.from(radioGroup).find(
              (radio) => radio.checked,
            );
            setIsVisible(checkedRadio?.value === dependsOnValue);
          } else if (element.type === "checkbox") {
            // For checkboxes
            setIsVisible(element.checked === (dependsOnValue === "true"));
          } else {
            // For other input types
            setIsVisible(element.value === dependsOnValue);
          }
        };

        // Initial check
        handleChange();

        // Add event listener
        element.addEventListener("change", handleChange);
        return () => {
          element.removeEventListener("change", handleChange);
        };
      }
    }
  }, [conditional, dependsOn, dependsOnValue]);

  // For keywords input
  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !keywords.includes(keywordInput.trim().toLowerCase())
    ) {
      setKeywords([...keywords, keywordInput.trim().toLowerCase()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  // For multiple entries
  const addEntry = () => {
    if (entryText.trim() && !entries.includes(entryText.trim())) {
      setEntries([...entries, entryText.trim()]);
      setEntryText("");
    }
  };

  const removeEntry = (entryToRemove: string) => {
    setEntries(entries.filter((entry) => entry !== entryToRemove));
  };

  // Handle keydown for keywords and entries
  const handleKeyDown = (e: React.KeyboardEvent, type: "keyword" | "entry") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "keyword") {
        addKeyword();
      } else {
        addEntry();
      }
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get all form elements
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // You would replace this with your actual submission logic
      const response = await fetch("/api/thesis/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Thesis submitted successfully!");
        form.reset();
        // You might want to redirect or show a success message
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission. Please try again.");
    }
  };

  if (!isVisible) return null;

  switch (type) {
    case "input":
      return (
        <input
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
          placeholder={placeholder}
          pattern={pattern}
        />
      );

    case "titleInput":
      return (
        <input
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
          placeholder="Enter the full thesis title"
        />
      );

    case "textarea":
      return (
        <textarea
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
          rows={5}
          placeholder={placeholder}
        />
      );

    case "select":
      return (
        <select
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required={required}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => {
            if (typeof option === "string") {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            } else {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            }
          })}
        </select>
      );

    case "radio":
      return (
        <div className="mt-1 flex space-x-4">
          {options.map((option, index) => {
            const optionValue =
              typeof option === "string" ? option : option.value;
            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <label key={index} className="inline-flex items-center">
                <input
                  type="radio"
                  name={name}
                  value={optionValue}
                  className="form-radio h-4 w-4 text-blue-600"
                  required={required}
                  onChange={() => setValue(optionValue)}
                  checked={value === optionValue}
                />
                <span className="ml-2">{optionLabel}</span>
              </label>
            );
          })}
        </div>
      );

    case "checkbox":
      return (
        <label className="mt-1 inline-flex items-center">
          <input
            type="checkbox"
            id={id}
            name={name}
            className="form-checkbox h-4 w-4 text-blue-600"
            required={required}
            onChange={(e) => setValue(e.target.checked ? "true" : "false")}
          />
          <span className="ml-2">{label}</span>
        </label>
      );

    case "datePicker":
      return (
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <button
                id={id}
                type="button"
                className={`flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left focus:ring-1 focus:ring-blue-500 focus:outline-none ${!date ? "text-gray-400" : ""}`}
              >
                {date ? format(date, "PPP") : "Select date..."}
                {icon && <span className="ml-2">{icon}</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                required={required}
              />
              <input
                type="hidden"
                name={name}
                value={date ? format(date, "yyyy-MM-dd") : ""}
                required={required}
              />
            </PopoverContent>
          </Popover>
        </div>
      );

    case "multipleEntries":
      return (
        <div>
          <div className="mt-1 flex">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              placeholder={placeholder || "Add an entry"}
              onKeyDown={(e) => handleKeyDown(e, "entry")}
            />
            <button
              type="button"
              onClick={addEntry}
              className="rounded-r-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 focus:outline-none"
            >
              <Plus size={16} />
            </button>
          </div>
          {entries.length > 0 && (
            <div className="mt-2 space-y-1">
              {entries.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded bg-gray-100 px-3 py-1"
                >
                  <span>{entry}</span>
                  <button
                    type="button"
                    onClick={() => removeEntry(entry)}
                    className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {/* Hidden inputs to store entries data */}
              {entries.map((entry, index) => (
                <input
                  key={index}
                  type="hidden"
                  name={`${name}[${index}]`}
                  value={entry}
                />
              ))}
            </div>
          )}
        </div>
      );

    case "keywordsInput":
      return (
        <div>
          <div className="mt-1 flex">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Add a keyword and press Enter"
              onKeyDown={(e) => handleKeyDown(e, "keyword")}
            />
            <button
              type="button"
              onClick={addKeyword}
              className="rounded-r-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 focus:outline-none"
            >
              <Plus size={16} />
            </button>
          </div>
          {keywords.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                >
                  <span>{keyword}</span>
                  <button
                    type="button"
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {/* Hidden inputs to store keywords data */}
              {keywords.map((keyword, index) => (
                <input
                  key={index}
                  type="hidden"
                  name={`${name}[${index}]`}
                  value={keyword}
                />
              ))}
            </div>
          )}
          {required && keywords.length === 0 && (
            <input type="hidden" name={`${name}-validation`} required />
          )}
        </div>
      );

    case "submitButton":
      return (
        <button
          type="submit"
          className="w-full transform rounded-md bg-[#0442B1] px-4 py-3 font-medium text-white transition-transform hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95"
        >
          {label || "Submit"}
        </button>
      );

    default:
      return null;
  }
};

export default ThesisFormClient;
