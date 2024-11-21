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
    try {
        const books = await prisma.book.findMany({
            include: {
                authors: true,
                advisors: true,
                department: true,
                program: true,
                school: true,
                uploadedBy: true
            }
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
}

export const getBookById = async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(`fetching book with id: ${id}`);
    try {
        const book = await prisma.book.findUnique({
            where: { id: String(id) },
            include: {
                authors: true,
                advisors: true,
                department: true,
                program: true,
                school: true,
                uploadedBy: true
            }
        });
        if (book) {
            res.json(book)
        } else {
            res.status(404).json({ error: 'Book not found.' })
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the book.' });
    }
}

export const deleteBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.delete({
            where: { id: String(id) }
        });
        res.json({ message: 'Book deleted successfully.', book });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the book.' });
    }
};

export const editBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, abstract, language, keywords, yearOfSubmission, authors, advisors, coverImageUrl } = req.body;

    try {
        const authorIds = await Promise.all(authors.map(({ firstName, lastName }: { firstName: string, lastName: string }) => findOrCreateAuthor(firstName, lastName)));
        const advisorIds = await Promise.all(advisors.map(({ firstName, lastName }: { firstName: string, lastName: string }) => findOrCreateAdvisor(firstName, lastName)));

        const updatedBook = await prisma.book.update({
            where: { id: String(id) },
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
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
};