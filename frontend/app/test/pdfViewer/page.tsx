"use client"

import { Viewer, Worker } from "@react-pdf-viewer/core";

export default function PdfViewerTest() {
  return (
    <main>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <div className="overflow-hidden">
          <Viewer fileUrl="/sample.pdf"/>
        </div>
      </Worker>
    </main>
  );
}