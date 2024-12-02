"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import UploadImage from './UploadImage'
import Header from '@/app/_components/Header'
import SideNav from '@/app/_components/SideNav'
import Footer from '@/app/_components/Footer'
import AddBookForm from '@/app/_components/AddBookForm'

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
	useEffect(() => {
		fetch(`http://localhost:3001/books/view/${id}`)
			.then(response => response.json())
			.then(data => {
				setTitle(data.title)
				setAbstract(data.abstract)
				setKeywords(data.keywords)
				setLanguage(data.language)
				setYearOfSubmission(data.yearOfSubmission)
				setCoverImageUrl(data.coverImageUrl)
				setAuthors(data.authors)
				setAdvisors(data.advisors)
				setBook(data)
			})
	}, [id])

	// code para mag connect sa backend
	const handleSubmit = async (e: React.FormEvent) => {
		// initialization
		e.preventDefault()

		// naka same naming sa prisma schema model
		const newBook = {
			title,
			abstract,
			language,
			keywords,
			yearOfSubmission,
			authors,
			advisors,
			coverImageUrl
		}

		console.log("Sending new book:", newBook)

		try {
			const response = await fetch(`http://localhost:3001/books/edit/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBook)
			})
			console.log(response)
			if (response.ok) {
				router.back() // Redirect to the previous page
			}
		} catch (error) {
			console.error(error)
		}
	}

	const addAuthor = () => {
		if (author_firstName && author_lastName) {
			setAuthors([...authors, { firstName: author_firstName, lastName: author_lastName }])
			// clear dayung ang state pagkatapus insert sa array sng authors
			setAuthor_firstName('')
			setAuthor_lastName('')
		} else {
			alert("Both names are required.")
		}
	}

	const removeAuthor = (removeIndex: number) => {
		const newArray = authors.filter((author, authorIndex) => removeIndex !== authorIndex)
		setAuthors(newArray)
	}

	const addAdvisor = () => {
		if (advisor_firstName && advisor_lastName) {
			setAdvisors([...advisors, { firstName: advisor_firstName, lastName: advisor_lastName }])
			// clear dayung ang state pagkatapus insert sa array sng authors
			setAdvisor_firstName('')
			setAdvisor_lastName('')
		} else {
			alert("Both names are required.")
		}
	}

	const removeAdvisor = (removeIndex: number) => {
		const newArray = advisors.filter((advisors, advisorIndex) => removeIndex !== advisorIndex)
		setAdvisors(newArray)
	}

	const [book, setBook] = useState<Book | null>(null)

	if (!book) return <div> Loading...</div>

	return (
		<div className="w-full min-h-screen flex flex-col">
			<Header />

			{/* Main Content with Sidebar under the banner */}
			<div className="flex flex-1 ml-4">
				<SideNav />

				<div className="flex-1">
					<AddBookForm 
						title="Edit Book / Research"
					/>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default EditBook