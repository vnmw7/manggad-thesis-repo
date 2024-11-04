// app/api/test/route.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("Test route hit!", req.method);
        res.status(200).json({ message: 'Test successful' });
    } catch (error) {
        console.error("Error in test route:", error);
        res.status(500).json({ error: "Test failed" });
    }
}