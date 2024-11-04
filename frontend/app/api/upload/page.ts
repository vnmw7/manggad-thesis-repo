import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Handler invoked');
    console.log('Request method:', req.method);
    console.log('Response object:', res);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = formidable({
        uploadDir: path.join(process.cwd(), 'public', 'uploads'),
        filename: (name, ext, part, form) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
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
        console.error('Error parsing the files:', error);
        res.status(500).json({ error: 'Error parsing the files' });
    }
}