import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// +------------------------+
// |        Functions       |
// +------------------------+
const findOrCreateAuthor = async (firstName: string, lastName: string) => {
    let author = await prisma.author.findFirst({
        where: { firstName, lastName }
    });

    // ma create author if wala may nakita
    if (!author) {
        author = await prisma.author.create({
            data: { firstName, lastName }
        });
    }

    return author.id;
};

const findOrCreateAdvisor = async (firstName: string, lastName: string) => {
    let advisor = await prisma.advisor.findFirst({
        where: { firstName, lastName }
    });

    // ma create author if wala may nakita
    if (!advisor) {
        advisor = await prisma.author.create({
            data: { firstName, lastName }
        });
    }

    return advisor.id;
};


// +--------------------------------+
// |        Main Controllers        |
// +--------------------------------+
export const addBook = async (req: Request, res: Response) => {
    const { title, abstract, language, keywords, yearOfSubmission, authors, advisors, coverImageUrl } = req.body;

    // gamit promise para mahultanay matapus anay ang mga execution sa promises
    const authorIds = await Promise.all(authors.map(({ firstName, lastName }: { firstName: string, lastName: string }) => findOrCreateAuthor(firstName, lastName)))
    const advisorIds = await Promise.all(advisors.map(({ firstName, lastName }: { firstName: string, lastName: string }) => findOrCreateAdvisor(firstName, lastName)))


    const test = await prisma.book.create({
        data: {
            title,
            abstract,
            language,
            keywords,
            yearOfSubmission,
            authorIds,
            advisorIds,
            coverImageUrl
        }
    });
    res.json(test);
}

export const getAllBooks = async (req: Request, res: Response) => {
    const books = await prisma.book.findMany();
    res.json(books);
}