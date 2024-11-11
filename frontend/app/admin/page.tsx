"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

interface Author {
    firstName: string;
    lastName: string;
}

interface Book {
    id: number;
    title: string;
    authors: Author[];
    yearOfSubmission: number;
}

const Dashboard = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:3001/books/')
            .then(response => response.json())
            .then(data => setBooks(data));
    }, []);

    const deleteBook = (id: number) => {
        fetch(`http://localhost:3001/books/delete/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setBooks(books.filter(book => book.id !== id));
            }
        });
    };

    return (
        <div>
            <h1 className='mt-10'> Current Uploaded Books </h1>
            <button onClick={() => router.push('/book/addBook')}> add book </button>

            {/* bookshelf */}
            <div className='flex flex-col gap-2 md:grid md:grid-cols-3 lg:grid-cols-4'>
                {books.map(book => (
                    <Card key={book.id} variant="outlined">
                        <CardContent>
                            <h1> {book.title} </h1>
                            <p> {book.authors.map(author => `${author.firstName} ${author.lastName}`).join(', ')} </p>
                            <p> {book.yearOfSubmission} </p>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => router.push(`/book/${book.id}`)}> View Details </Button>
                            <Button size="small" onClick={() => router.push(`/book/${book.id}/edit`)}> Edit </Button>
                            <Button size="small" onClick={() => deleteBook(book.id)}> Delete </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;