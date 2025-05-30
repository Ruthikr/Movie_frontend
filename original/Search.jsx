import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(() => {
    // Load saved movies from localStorage if available
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Save movies to localStorage when movies change
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleSearch = async () => {
    setError(''); // Clear previous errors

    try {
      const response = await axios.get('http://127.0.0.1:5000/search', {
        params: { query: query },
      });

      if (response.data.length === 0) {
        setError('No movies found. Try searching for something else!');
      } else {
        setMovies(response.data); // Store the result in state and localStorage
      }
    } catch (error) {
      setError('An error occurred while fetching movie details. Please try again.');
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="search-container">
      <h1>Find , Watch , Enjoy!</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
      /> 
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>

      <div className="results-container">
        {error ? (
          <div className="error-message">{error}</div>
        ) : movies.length > 0 ? (
          <div className="movie-list">
            {movies.map((movie, index) => (
              <div key={index} className="movie-card">
               
                <img src={movie.backdrop_img} alt={movie.title} />
                 <h3 id="title">{movie.title}</h3>
                <p id="gen">{movie.genre_names.join(", ")}</p>
                <Link
                  to={`/movie/${movie.id}`}
                  state={{ movie: movie }} // Pass the movie object here
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>Start searching for movies!</div>
        )}
      </div>
    </div>
  );
}

export default Search;