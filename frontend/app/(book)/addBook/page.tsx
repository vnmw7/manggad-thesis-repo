"use client"

const AddBook = () => {
	return (
		<div>
			<form>
				<div>
					<label htmlFor="title">Title:</label>
					<input type="text" id="title" name="title" required />
				</div>
				<div>
					<label htmlFor="author">Author:</label>
					<input type="text" id="author" name="author" required />
				</div>
				<div>
					<label htmlFor="genre">Genre:</label>
					<input type="text" id="genre" name="genre" required />
				</div>
				<div>
					<label htmlFor="publishedDate">Published Date:</label>
					<input type="date" id="publishedDate" name="publishedDate" required />
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