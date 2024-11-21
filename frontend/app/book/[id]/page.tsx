"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

// typescript nga mag set up types sa dictionary
interface Author {
	firstName: string;
	lastName: string;
}
interface Book {
    id: string;
    title: string;
    abstract?: string;
    keywords?: string;
    language?: string;
    yearOfSubmission?: number;
    coverImageUrl?: string;
    authors: Author[];
}

const ViewBook = () => {
    const [book, setBook] = useState<Book | null>(null);
    const { id } = useParams();
    
    useEffect(() => {
        fetch(`http://localhost:3001/books/view/${id}`)
            .then(response => response.json())
            .then(data => setBook(data));
    }, [id]);

    if (!book) return <div> Loading...</div>;

	return (
		<div>
            <h1>{book.title}</h1>
            <p>{book.abstract}</p>
            <p>{book.keywords}</p>
            <p>{book.language}</p>
            <p>{book.yearOfSubmission}</p>
            <img src={book.coverImageUrl} alt={book.title} />
            <h2>Authors</h2>
            <ul>
                {book.authors.map((author, index) => (
                    <li key={index}>{author.firstName} {author.lastName}</li>
                ))}
            </ul>
		</div>
	)
}

export default ViewBook