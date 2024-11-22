"use client"

import { useState, ChangeEvent, FormEvent } from 'react';

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={query} 
                onChange={handleChange} 
                placeholder="Search..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;