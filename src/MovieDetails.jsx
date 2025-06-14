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
      <div className="loading-spinner flex justify-center items-center h-screen">
        <div className="spinner w-20 h-20 border-8 border-transparent border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container text-center py-10">
        <h2 className="text-2xl text-red-500 mb-4">Error: {error}</h2>
        <button onClick={goBack} className="bg-accent hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Back to Search Results</button>
      </div>
    );
  }

  if (!movie) {
    return <div className="error-container text-center py-10 text-text-secondary">No movie data available</div>;
  }

  return (
    <div className="movie-details-container container mx-auto p-4 text-text-primary animate-fadeIn">
      {/* Movie Title */}
      <h2 id="mtitle" className="text-3xl lg:text-4xl font-bold text-text-primary mb-6 text-center">{movie.title}</h2>

      <div className="md:flex md:space-x-8 bg-secondary-bg p-4 sm:p-6 rounded-lg shadow-xl">
        {/* Column 1: Image & Trailer */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          {movie.backdrop_img && (
            <img
              src={movie.backdrop_img}
              alt={movie.title}
              className="movie-backdrop rounded-lg shadow-lg mb-6 w-full"
            />
          )}
          {movie.trailer && (
            <div className="trailer-section text-center">
              <h3 className="text-xl font-semibold text-text-primary mb-3">Watch Trailer</h3>
              {showTrailer ? (
                <div className="trailer-container w-full aspect-video rounded-lg shadow-lg overflow-hidden mb-2">
                  <iframe
                    className="w-full h-full"
                    src={getEmbeddableUrl(movie.trailer)}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="relative">
                  <img
                    className="trailer-thumbnail rounded-lg cursor-pointer hover:opacity-80 transition-opacity shadow-md w-full"
                    src={movie.trailer_thumbnail || movie.backdrop_img}
                    alt="Trailer Thumbnail"
                    onClick={() => setShowTrailer(true)}
                  />
                  {/* You can add a play icon overlay here if desired */}
                </div>
              )}
              {!showTrailer && (
                <p id="pt" className="text-xs text-text-secondary mt-2">
                  Click on the image above to watch the trailer
                </p>
              )}
            </div>
          )}
        </div>

        {/* Column 2: Details */}
        <div className="md:w-2/3">
          <p className="movie-overview text-text-secondary mb-6 text-base leading-relaxed">
            {movie.plot_overview || 'No overview available'}
          </p>

          <div className="movie-info mb-6">
            <h3 className="text-xl font-semibold text-text-primary mb-3">Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <p className="mb-2 text-sm"><span className="font-semibold text-text-primary">Release Date:</span> <span className="text-text-secondary">{movie.release_date || 'Unknown'}</span></p>
              <p className="mb-2 text-sm"><span className="font-semibold text-text-primary">Rating:</span> <span className="text-text-secondary">{movie.user_rating || 'Not rated'}</span></p>
              <p className="mb-2 text-sm col-span-1 sm:col-span-2"><span className="font-semibold text-text-primary">Genres:</span> <span className="text-text-secondary">{(movie.genre_names && movie.genre_names.join(', ')) || 'Not specified'}</span></p>
              <p className="mb-2 text-sm"><span className="font-semibold text-text-primary">Original Language:</span> <span className="text-text-secondary">{movie.original_language || 'Unknown'}</span></p>
              <p className="mb-2 text-sm"><span className="font-semibold text-text-primary">Original Title:</span> <span className="text-text-secondary">{movie.original_title || movie.title}</span></p>
              <p className="mb-2 text-sm"><span className="font-semibold text-text-primary">Runtime:</span> <span className="text-text-secondary">{movie.runtime_minutes ? convertMinutesToTimeString(movie.runtime_minutes) : 'Unknown'}</span></p>
              <p className="mb-2 text-sm"><span className="font-semibold text-text-primary">Type:</span> <span className="text-text-secondary">{movie.type || 'Unknown'}</span></p>
            </div>
          </div>

          {movie.available_on && movie.available_on.length > 0 && (
            <div className="availability-section">
              <h3 className="text-xl font-semibold text-text-primary mb-3">Available On</h3>
              <ul className="space-y-2">
                {movie.available_on.map((source, idx) => (
                  <li key={idx} className="text-sm">
                    <span className="font-semibold text-text-primary">{source.name}:</span>{' '}
                    <a
                      id="source"
                      href={source.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:opacity-75 font-medium transition-colors duration-200 ease-in-out hover:underline"
                    >
                      Watch Here
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={goBack}
        className="back-button py-2 px-6 bg-accent hover:bg-opacity-80 text-white font-semibold rounded-md mt-8 inline-block transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Back to Search Results
      </button>
    </div>
  );
}

export default MovieDetails;