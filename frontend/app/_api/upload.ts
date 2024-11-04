import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import fs from 'fs'; // needed now to write image file
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = formidable({
        uploadDir: path.join(process.cwd(), 'public', 'uploads'), // Directory to save to
        filename: (name, ext, part, form) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // For unique file names to prevent clashes
            return `${name}-${uniqueSuffix}${ext}`;
        },
    });

    try {
        await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ fields, files });
                }
            });
        });

        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error parsing the files' });
    }
}