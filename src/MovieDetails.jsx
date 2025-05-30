import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const movieData = location.state?.movie;

    if (!movieData) {
      setError('Movie data not available');
    } else if (!movieData.title || !movieData.backdrop_img) {
      setError('Incomplete movie data');
    } else {
      setMovie(movieData);
    }
    setIsLoading(false);
  }, [location.state]);

  const getEmbeddableUrl = (url) => {
    if (!url) return '';
    const videoId = url.split('v=')[1] || '';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  };

  const goBack = () => navigate(-1);

  // Helper function to convert minutes into hh:mm:ss format
  const convertMinutesToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const seconds = Math.floor((minutes * 60) % 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error: {error}</h2>
        <button onClick={goBack}>Back to Search Results</button>
      </div>
    );
  }

  if (!movie) {
    return <div className="error-container">No movie data available</div>;
  }

  return (
    <div className="movie-details-container">
      <h2 id="mtitle">{movie.title}</h2>
      <div className="movie-details">
        {movie.backdrop_img && <img src={movie.backdrop_img} alt={movie.title} className="movie-backdrop" />}
        <p className="movie-overview">{movie.plot_overview || 'No overview available'}</p>
        <div className="movie-info">
          <p>Release Date: <b>{movie.release_date || 'Unknown'}</b></p>
          <p>Rating: <b>{movie.user_rating || 'Not rated'}</b></p>
          <p>Genres: <b>{(movie.genre_names && movie.genre_names.join(', ')) || 'Not specified'}</b></p>
          <p>Original Language: <b>{movie.original_language || 'Unknown'}</b></p>
          <p>Original Title: <b>{movie.original_title || movie.title}</b></p>
          
          {/* Convert and display runtime in hh:mm:ss format */}
          <p>Runtime: <b>{movie.runtime_minutes ? convertMinutesToTimeString(movie.runtime_minutes) : 'Unknown'}</b></p>

          <p>Type: <b>{movie.type || 'Unknown'}</b></p>
        </div>
        <br />
        <hr className="light-hr" />
        <br />
        {movie.trailer && (
          <div className="trailer-section">
            <h3 id="yt">Watch Trailer Here</h3>
            <div className="trailer-container">
              {showTrailer ? (
                <iframe
                  width="560"
                  height="315"
                  src={getEmbeddableUrl(movie.trailer)}
                  title="Movie Trailer"
                  frameBorder="0"
                
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  className="trailer-thumbnail"
                  src={movie.trailer_thumbnail || movie.backdrop_img}
                  alt="Trailer Thumbnail"
                  onClick={() => setShowTrailer(true)}
                />
              )}
            </div>
            <div id="t">
              <i className="fa-solid fa-arrow-up"></i>
            
            </div>
              <p id="pt">click on above image to watch trailer</p>
          </div>
        )}
        <br />
        <hr className="light-hr" />
        <br />
        <br />
        {movie.available_on && movie.available_on.length > 0 && (
          <div className="availability-section">
            <h3>Movie Is <u id="under">Available</u> To Watch On Below Platforms:</h3>
            <ul>
              {movie.available_on.map((source, idx) => (
                <li key={idx}>
                  {source.name} : {' '}
                  <a id="source" href={source.web_url} target="_blank" rel="noopener noreferrer">
                    Watch Here
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={goBack} className="back-button">Back to Search Results</button>
    </div>
  );
}

export default MovieDetails;