"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

const SearchBookPage = () => {
	const [results, setResults] = useState<{ id: number; title: string; content: string }[]>([]);
	const [data, setData] = useState<{ id: number; title: string; content: string }[]>([]);
	const [query, setQuery] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:3001/books/search');
			const allData = await response.json();
			setData(allData);
		}; fetchData();
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const filteredResults = data.filter(item =>
			item.title.toLowerCase().includes(query.toLowerCase()) ||
			item.content.toLowerCase().includes(query.toLowerCase())
		); setResults(filteredResults);
	};
	
	return (
		<div> 
			<form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleChange} placeholder="Search..."/>
                <button type="submit">Search</button>
            </form>
			<ul>
				{results.map(result => (
				<li key={result.id}>
					<h2>{result.title}</h2>
				</li>
				))}
			</ul>
		</div>
	)
}

export default SearchBookPage;