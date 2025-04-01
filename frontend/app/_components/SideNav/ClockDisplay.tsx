import React from "react";
import { ClockDisplayProps } from "./types";

// Clock Display Component for showing date and time in the sidebar
const ClockDisplay = ({ formattedDate, formattedTime }: ClockDisplayProps) => (
  <div className="mb-4 rounded-lg bg-blue-50/70 p-3 text-center font-mono text-sm dark:bg-blue-900/30">
    <div className="text-blue-800 dark:text-blue-200">{formattedDate}</div>
    <div className="text-blue-800 dark:text-blue-200">{formattedTime}</div>
  </div>
);

export default ClockDisplay;
