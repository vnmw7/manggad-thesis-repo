"use client"

import { useState } from 'react'

// typescript nga mag set up types sa dictionary
interface Author {
	firstName: string;
	lastName: string;
}

const AddBook = () => {
	const [ title, setTitle ] = useState('')
	const [ abstract, setAbstract ] = useState('')
	const [ keywords, setKeywords ] = useState('')
	const [ language, setLanguage ] = useState('')
	const [ yearOfSubmission, setYearOfSubmission ] = useState<number | ''>('')
	const [coverImage, setCoverImage] = useState<File | null>(null);

	// para sa authors nga naka array
	const [authors, setAuthors] = useState<Author[]>([])
	const [author_firstName, setAuthor_firstName] = useState('');
    const [author_lastName, setAuthor_lastName] = useState('');

	// para sa advisors nga naka array
	const [advisors, setAdvisors] = useState<Author[]>([])
	const [advisor_firstName, setAdvisor_firstName] = useState('');
	const [advisor_lastName, setAdvisor_lastName] = useState('');

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
		}

		console.log("Sending new book:", newBook);

		try {
			const response = await fetch('http://localhost:3001/books', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBook)
			})
			console.log(response)
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
            alert("Both names are required.");
		}
    };

	const removeAuthor = (removeIndex: number)=>{
		const newArray = authors.filter((author, authorIndex)=> removeIndex !== authorIndex);
		setAuthors(newArray);
	}

	const addAdvisor = () => {
        if (author_firstName && author_lastName) {
            setAuthors([...authors, { firstName: author_firstName, lastName: author_lastName }])
			// clear dayung ang state pagkatapus insert sa array sng authors
            setAuthor_firstName('')
            setAuthor_lastName('')
        } else {
            alert("Both names are required.");
		}
    };

	const removeAdvisor	= (removeIndex: number)=>{
		const newArray = advisors.filter((advisors, advisorIndex)=> removeIndex !== advisorIndex);
		setAdvisors(newArray);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="publishedDate"> Title: </label>
					<input value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>

				<div>
					<input value={author_firstName} onChange={e => setAuthor_firstName(e.target.value)} placeholder="First Name" />
					<input value={author_lastName} onChange={e => setAuthor_lastName(e.target.value)} placeholder="Last Name" />
					<button type="button" onClick={addAuthor}>Add Author</button>
					<ul>
						{authors.map((author, index) => (
							<li key={index}> 
								{author.firstName} {author.lastName}  
								<button onClick={()=> removeAuthor(index) } type="button"> Remove </button> 
							</li>
						))}
					</ul>
				</div>

				<div>
					<input value={advisor_firstName} onChange={e => setAdvisor_firstName(e.target.value)} placeholder="First Name" />
					<input value={advisor_lastName} onChange={e => setAdvisor_lastName(e.target.value)} placeholder="Last Name" />
					<button type="button" onClick={addAuthor}>Add Advisor</button>
					<ul>
						{authors.map((advisor, index) => (
							<li key={index}> 
								{advisor.firstName} {advisor.lastName}  
								<button onClick={()=> removeAdvisor(index) } type="button"> Remove </button> 
							</li>
						))}
					</ul>
				</div>

				<div>
					<label> Abstract: </label>
					<input value={abstract} onChange={(e) => setAbstract(e.target.value)} />
				</div>
				<div>
					<label> Language: </label>
					<input value={language} onChange={(e) => setLanguage(e.target.value)} />
				</div>
				<div>
					<label> Keywords: </label>
					<input value={keywords} onChange={(e) => setKeywords(e.target.value)} />
				</div>
				<div>
					<label>Published Year:</label>
					<input type="number" id="publishedYear" name="publishedYear" min="2010" max="3000" value={yearOfSubmission} onChange={(e) => setYearOfSubmission(parseInt(e.target.value))}/>
				</div>
				<button type="submit">Add Book</button>
			</form>
		</div>
	)
}

export default AddBook