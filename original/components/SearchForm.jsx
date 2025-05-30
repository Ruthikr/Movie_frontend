import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="p-2 border border-gray-300 rounded mb-2 w-1/2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
}

export default SearchForm;