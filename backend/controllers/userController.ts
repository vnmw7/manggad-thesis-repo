import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (user) {
        res.json(user);
    } else {
        res.json({ error: 'User not found' });
    }
};

export const addUser = async (req: Request, res: Response) => {
    const newUser = req.body;
    const user = await prisma.user.create({
        data: newUser,
    });
    res.json(user);
};