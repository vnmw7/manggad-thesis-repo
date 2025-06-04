"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { X, Plus } from "lucide-react";

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
  value?: string | string[] | Date;
  checked?: boolean;
  onChange?: (value: any) => void;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
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
  value: propValue, // Renamed to avoid conflict with state
  checked,
  onChange,
  onClick,
  disabled = false,
}) => {
  // Remove internal state for value, date, entries, keywords
  // const [inputValue, setInputValue] = useState<string>(
  //   typeof propValue === "string" ? propValue : "",
  // );
  const [date, setDate] = useState<Date | undefined>(
    propValue instanceof Date ? propValue : undefined,
  );
  // Use local state only for the temporary input fields
  const [entryText, setEntryText] = useState<string>("");
  const [keywordInput, setKeywordInput] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(!conditional);

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

  // Update internal date state if propValue changes (for datePicker)
  useEffect(() => {
    if (type === "datePicker" && propValue instanceof Date) {
      setDate(propValue);
    } else if (type === "datePicker" && propValue === undefined) {
      setDate(undefined);
    }
  }, [propValue, type]);

  // For keywords input
  const addKeyword = () => {
    const currentKeywords = Array.isArray(propValue) ? propValue : [];
    if (
      keywordInput.trim() &&
      !currentKeywords.includes(keywordInput.trim().toLowerCase())
    ) {
      const newKeywords = [
        ...currentKeywords,
        keywordInput.trim().toLowerCase(),
      ];
      if (onChange) {
        onChange(newKeywords); // Call parent onChange with the new array
      }
      setKeywordInput("");
    }
  };
  const removeKeyword = (keywordToRemove: string) => {
    const currentKeywords = Array.isArray(propValue) ? propValue : [];
    const newKeywords = currentKeywords.filter(
      (keyword) => keyword !== keywordToRemove,
    );
    if (onChange) {
      onChange(newKeywords); // Call parent onChange with the new array
    }
  };

  // For multiple entries
  const addEntry = () => {
    const currentEntries = Array.isArray(propValue) ? propValue : [];
    if (entryText.trim() && !currentEntries.includes(entryText.trim())) {
      const newEntries = [...currentEntries, entryText.trim()];
      if (onChange) {
        onChange(newEntries); // Call parent onChange with the new array
      }
      setEntryText("");
    }
  };
  const removeEntry = (entryToRemove: string) => {
    const currentEntries = Array.isArray(propValue) ? propValue : [];
    const newEntries = currentEntries.filter(
      (entry) => entry !== entryToRemove,
    );
    if (onChange) {
      onChange(newEntries); // Call parent onChange with the new array
    }
  };

  // Handle keydown for keywords and entries
  const handleKeyDown = (
    e: React.KeyboardEvent,
    inputType: "keyword" | "entry",
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputType === "keyword") {
        addKeyword();
      } else {
        addEntry();
      }
    }
  };

  if (!isVisible) return null;

  switch (type) {
    case "input":
      return (
        <input
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={typeof propValue === "string" ? propValue : ""}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          placeholder={placeholder}
          pattern={pattern}
          disabled={disabled}
        />
      );
    case "textarea":
      return (
        <textarea
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          rows={4}
          value={typeof propValue === "string" ? propValue : ""}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
        />
      );
    case "select":
      return (
        <select
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={typeof propValue === "string" ? propValue : ""}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options.map((option, index) => {
            const value = typeof option === "string" ? option : option.value;
            const label = typeof option === "string" ? option : option.label;
            return (
              <option key={index} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      );
    case "radio":
      return (
        <div className="mt-2 space-y-2">
          {(options as { value: string; label: string }[]).map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              {" "}
              <input
                type="radio"
                id={`${id}-${option.value}`}
                name={name}
                value={option.value}
                checked={propValue === option.value}
                onChange={(e) => onChange?.(e.target.value)}
                required={required}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out dark:border-gray-600 dark:bg-gray-700"
                disabled={disabled}
              />
              <span className="text-gray-700 dark:text-gray-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="mt-2 flex items-center">
          {" "}
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            required={required}
            className="form-checkbox h-4 w-4 rounded text-blue-600 transition duration-150 ease-in-out dark:border-gray-600 dark:bg-gray-700"
            disabled={disabled}
          />
          {label && (
            <label
              htmlFor={id}
              className="ml-2 block text-sm text-gray-900 dark:text-gray-200"
            >
              {label}
            </label>
          )}
        </div>
      );
    case "datePicker":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={`mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
                !date ? "text-gray-500 dark:text-gray-400" : ""
              }`}
              disabled={disabled}
            >
              {/* Use internal date state for display */}
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              {icon || <span className="ml-auto h-4 w-4 opacity-50">📅</span>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            {" "}
            <Calendar
              mode="single"
              selected={date} // Use internal date state for calendar
              onSelect={(selectedDate) => {
                setDate(selectedDate); // Update internal state
                if (onChange) {
                  onChange(selectedDate); // Propagate change to parent
                }
              }}
              initialFocus
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>
      );
    case "multipleEntries":
      const currentEntries = Array.isArray(propValue) ? propValue : [];
      return (
        <div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={entryText} // Controlled by local state
              onChange={(e) => setEntryText(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "entry")}
              placeholder={placeholder || "Add an entry"}
              className="mt-1 flex-grow rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={disabled}
            />
            <button
              type="button"
              onClick={addEntry}
              className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={disabled}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {/* Display entries from propValue */}
            {currentEntries.map((entry, index) => (
              <span
                key={index}
                className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200"
              >
                {entry}
                <button
                  type="button"
                  onClick={() => removeEntry(entry)}
                  className="ml-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  disabled={disabled}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      );
    case "keywordsInput":
      const currentKeywords = Array.isArray(propValue) ? propValue : [];
      return (
        <div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={keywordInput} // Controlled by local state
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "keyword")}
              placeholder={placeholder || "Add a keyword"}
              className="mt-1 flex-grow rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={disabled}
            />
            <button
              type="button"
              onClick={addKeyword}
              className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={disabled}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {/* Display keywords from propValue */}
            {currentKeywords.map((keyword, index) => (
              <span
                key={index}
                className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="ml-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  disabled={disabled}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      );
    case "titleInput":
      return (
        <input
          id={id}
          name={name}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-lg font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          value={typeof propValue === "string" ? propValue : ""}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          placeholder={placeholder || "Enter thesis title"}
          disabled={disabled}
        />
      );
    case "submitButton":
      return (
        <button
          type="submit"
          onClick={onClick}
          disabled={disabled}
          className="w-full rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-800"
        >
          {label || "Submit"}
        </button>
      );
    default:
      return null;
  }
};

export default ThesisFormClient;
