import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTest = async (req: Request, res: Response) => {
    const newBook = req.body;
    const test = await prisma.test.create({
        data: newBook
    });
    res.json(test);
}

export const getAllBooks = async (req: Request, res: Response) => {
    const books = await prisma.test.findMany();
    res.json(books);
}