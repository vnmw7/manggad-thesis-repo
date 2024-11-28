"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Header from '@/app/_components/Header'
import SideNav from '@/app/_components/SideNav'
import Footer from '@/app/_components/Footer'
import AddEditBookForm from '@/app/_components/AddEditBookForm'
import { error } from 'console'

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

const EditBook = () => {
	const [title, setTitle] = useState('')
	const [abstract, setAbstract] = useState('')
	const [keywords, setKeywords] = useState('')
	const [language, setLanguage] = useState('')
	const [yearOfSubmission, setYearOfSubmission] = useState<number | null>(null)
	const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)

	// para sa authors nga naka array
	const [authors, setAuthors] = useState<Author[]>([])
	const [author_firstName, setAuthor_firstName] = useState('')
	const [author_lastName, setAuthor_lastName] = useState('')

	// para sa advisors nga naka array
	const [advisors, setAdvisors] = useState<Author[]>([])
	const [advisor_firstName, setAdvisor_firstName] = useState('')
	const [advisor_lastName, setAdvisor_lastName] = useState('')

	const router = useRouter()
	const { id } = useParams()

	// Fetch book details and set form fields
	// useEffect(() => {
	// 	fetch(`http://localhost:3001/books/view/${id}`)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			setTitle(data.title)
	// 			setAbstract(data.abstract)
	// 			setKeywords(data.keywords)
	// 			setLanguage(data.language)
	// 			setYearOfSubmission(data.yearOfSubmission)
	// 			setCoverImageUrl(data.coverImageUrl)
	// 			setAuthors(data.authors)
	// 			setAdvisors(data.advisors)
	// 			setBook(data)
	// 		})
	// }, [id])

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