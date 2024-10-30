"use client"

import { useState } from 'react'

const AddBook = () => {
	const [ title, setTitle ] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const newBook = {
			title,
		}

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

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title:</label>
					<input value={title} onChange={(e) => setTitle(e.target.value)} required />
				</div>
				<div>
					<label htmlFor="author">Author:</label>
					<input type="text" id="author" name="author" />
				</div>
				<div>
					<label htmlFor="genre">Genre:</label>
					<input type="text" id="genre" name="genre" />
				</div>
				<div>
					<label htmlFor="publishedDate">Published Date:</label>
					<input type="date" id="publishedDate" name="publishedDate" />
				</div>
				<div>
					<label htmlFor="coverImage">Cover Image:</label>
					<input type="file" id="coverImage" name="coverImage" accept="image/*" />
				</div>
				<button type="submit">Add Book</button>
			</form>
		</div>
	)
}

export default AddBook