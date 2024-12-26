// pages/api/pdf/[pdfName].js  (or app/api/pdf/[pdfName]/route.js in App Router with Node.js runtime)

import fs from 'fs';
import path from 'path';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pdfName } = req.query;
  const filePath = path.join(process.cwd(), 'app', 'pdfs', `${pdfName}.pdf`); // Adjust path as needed

  try {
    const fileStream = fs.createReadStream(filePath);

    res.setHeader('Content-Type', 'application/pdf'); // Crucial for correct handling
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving PDF:', error);
    res.status(404).end(); // Handle file not found or other errors
  }
}