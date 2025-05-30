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
    <div className="search-container">
      <h1>Find, Watch, Enjoy!</h1>
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Search' : 'Search'}
        </button>
      </div>

      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}

      <div className="results-container">
        {error ? (
          <div className="error-message">{error}</div>
        ) : movies.length > 0 ? (
          <div className="movie-list">
            {movies.map((movie, index) => (
            <Link
                  id="link"
                  to={`/movie/${movie.id}`}
                  state={{ movie: movie }}
                >
              <div key={index} className="movie-card">
                {movie.backdrop_img ? (
                  <img src={movie.backdrop_img} alt={movie.title} />
                ) : (
                  <div className="no-image-placeholder">No Image Available</div>
                )}
                <h3 id="title">{movie.title || "No Title Available"}</h3>
                <p id="gen">{movie.genre_names?.join(", ") || "No genres available"}</p>
                <p id="date">{movie.release_date || "No date available"}</p>

              
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
