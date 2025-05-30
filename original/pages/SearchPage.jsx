import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import MovieCard from '../components/MovieCard';

function SearchPage() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <SearchForm onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;