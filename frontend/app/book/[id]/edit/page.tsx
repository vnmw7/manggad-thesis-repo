"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/app/_components/Header'
import SideNav from '@/app/_components/SideNav'
import Footer from '@/app/_components/Footer'
import AddEditBookForm from '@/app/_components/AddEditBookForm'

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
	coverImage?: string;
	authors: Author[];
}

const EditBook = () => {
	const { id } = useParams()

	const [Book, setBook] = useState<Book | null>(null)
	useEffect(() => {
		fetch(`http://localhost:3001/books/view/${id}`)
			.then(response => response.json())
			.then(data => setBook(data))
			.catch(error => console.error(error))
	}, [id])

	if (!Book) return <div> Loading...</div>

	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />

			{/* Main Content with Sidebar under the banner */}
			<div className="flex flex-1 ml-4">
				<SideNav />

				<div className="flex-1">
					<button onClick={() => console.log(Book)}>Log Book</button>
					<AddEditBookForm
						heading="Edit Book / Research"
						Book={Book}
					/>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default EditBook