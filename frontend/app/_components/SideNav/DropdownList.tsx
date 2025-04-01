import React from "react";
import { DropdownListProps } from "./types";

// Dropdown List Container - reusable container to avoid duplicate styling
const DropdownList = ({ children }: DropdownListProps) => (
  <ul className="mt-1 space-y-2 rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-gray-800/50">
    {children}
  </ul>
);

export default DropdownList;
