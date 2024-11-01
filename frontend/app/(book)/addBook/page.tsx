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
	const [ yearOfSubmission, setYearOfSubmission ] = useState<number | undefined>(undefined)

	// para sa author nga naka array
	const [authors, setAuthors] = useState<Author[]>([])
	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
			authors
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
        if (firstName && lastName) {
            setAuthors([...authors, { firstName: firstName, lastName: lastName }])
			// clear dayung ang state pagkatapus insert sa array sng authors
            setFirstName('')
            setLastName('')
        } else {
            alert("Both names are required.");
		}
    };

	const removeAuthor = (removeIndex: number)=>{
		const newArray = authors.filter((author, authorIndex)=> removeIndex !== authorIndex);
		setAuthors(newArray);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="publishedDate"> Title: </label>
					<input value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>

				<div>
					<input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
					<input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
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
					<label htmlFor="publishedDate"> Abstract: </label>
					<input value={abstract} onChange={(e) => setAbstract(e.target.value)} />
				</div>
				<div>
					<label htmlFor="publishedDate"> Language: </label>
					<input value={language} onChange={(e) => setLanguage(e.target.value)} />
				</div>
				<div>
					<label htmlFor="publishedDate"> Keywords: </label>
					<input value={keywords} onChange={(e) => setKeywords(e.target.value)} />
				</div>
				<div>
					<label htmlFor="publishedYear">Published Year:</label>
					<input type="number" id="publishedYear" name="publishedYear" min="2010" max="3000" value={yearOfSubmission} onChange={(e) => setYearOfSubmission(parseInt(e.target.value))}/>
				</div>
				{/* <div>
					<label htmlFor="coverImage">Cover Image:</label>
					<input type="file" id="coverImage" name="coverImage" accept="image/*" />
				</div> */}
				<button type="submit">Add Book</button>
			</form>
		</div>
	)
}

export default AddBook