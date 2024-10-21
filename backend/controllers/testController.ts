import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTest = async (req: Request, res: Response) => {
    const newTest = req.body;
    const test = await prisma.test.create({
        data: newTest
    });
    res.json(test);
}

export const getAllTests = async (req: Request, res: Response) => {
    const tests = await prisma.test.findMany();
    res.json(tests);
}