import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await axios.get('https://movie-backend-6mu4.onrender.com/search', {
        params: { query: query.trim() },
      });

      if (response.data.length === 0) {
        setError('No movies found. Try searching for something else!');
      } else {
        setMovies(response.data);  // This line is enough to set the new movies.
      }
    } catch (error) {
      setError('An error occurred while fetching movie details. Please try again.');
      console.error('Error fetching movie details:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="search-container p-4 animate-fadeIn">
      <h1 className="text-4xl font-bold text-center text-accent my-6">Find, Watch, Enjoy!</h1>
      <div className="search-input-container flex items-center justify-center mb-6 space-x-2">
        <input
          type="text"
          className="w-full sm:w-auto py-2 px-4 border border-gray-600 focus:border-accent rounded-md bg-secondary-bg focus:bg-gray-700 text-text-primary placeholder-text-secondary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="search-btn py-2 px-6 bg-accent hover:bg-opacity-80 text-white rounded-md font-semibold focus:ring-2 focus:ring-accent transition-all duration-200 ease-in-out"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {isLoading && (
        <div className="loading-spinner flex justify-center items-center h-24 my-6">
          <div className="spinner w-20 h-20 border-8 border-transparent border-t-accent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="results-container">
        {error ? (
          <div className="error-message text-red-400 bg-red-900 bg-opacity-50 p-4 rounded-md text-center my-4">{error}</div>
        ) : movies.length > 0 ? (
          <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 mb-10">
            {movies.map((movie, index) => (
            <Link
                  id="link"
                  className="text-text-primary no-underline transform transition-transform duration-200 hover:scale-105 group"
                  to={`/movie/${movie.id}`}
                  state={{ movie: movie }}
                  key={movie.id}
                >
              <div className="movie-card bg-secondary-bg p-4 rounded-lg text-center shadow-lg group-hover:shadow-xl h-full flex flex-col justify-between transition-all duration-200 ease-in-out">
                <div>
                  {movie.backdrop_img ? (
                    <img src={movie.backdrop_img} alt={movie.title} className="rounded-md mb-3 w-full h-48 object-cover" />
                  ) : (
                    <div className="no-image-placeholder bg-gray-700 text-gray-400 flex items-center justify-center h-48 rounded-md mb-3">No Image Available</div>
                  )}
                  <h3 id="title" className="text-lg font-semibold mb-1 text-text-primary">{movie.title || "No Title Available"}</h3>
                </div>
                <div>
                  <p id="gen" className="text-sm text-text-secondary mb-1">{movie.genre_names?.join(", ") || "No genres available"}</p>
                  <p id="date" className="text-sm text-text-secondary">{movie.release_date || "No date available"}</p>
                </div>
              </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
