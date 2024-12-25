import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Directory to store uploaded files
const tempDir = path.join(process.cwd(), 'public', 'temp'); // Directory to store temporary files

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm({
        uploadDir: uploadDir,
        tempDir: tempDir,
        keepExtensions: true, // Keep file extension on uploaded files
        filename: (name, ext) => { // Customize filenames
          return `${Date.now()}_${name}${ext}`;
        },
        filter: (part) => {
          const { originalFilename, mimetype, size } = part as unknown as formidable.File;
          // Check file types and size here
          return !!(mimetype === 'application/pdf' && originalFilename && size < 10 * 1024 * 1024); // 10MB limit
        }
      }, as formidable.Options);

      (form as any).tempDir = tempDir; 

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'File upload failed' });
        }

        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
        const filePath = (file as formidable.File).filepath; // Path to the uploaded file


        return res.status(200).json({ message: 'File uploaded successfully', path: path.relative(process.cwd(), filePath) });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'File upload failed' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}