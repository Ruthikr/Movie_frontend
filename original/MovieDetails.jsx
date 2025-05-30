import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MovieDetails.css';

function MovieDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {}; // Add fallback in case state is missing

  const [showTrailer, setShowTrailer] = useState(false); // State to toggle between thumbnail and trailer

  // Scroll to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to convert regular YouTube URL to embeddable format
  const getEmbeddableUrl = (url) => {
    if (!url) return ''; // Handle case when URL is missing
    const videoId = url.includes('v=') ? url.split('v=')[1] : ''; // Extract the video ID after 'v='
    return `https://www.youtube.com/embed/${videoId}`;
  };

  // Navigate back to the previous search results
  const goBack = () => {
    navigate(-1);
  };

  // Check if movie is available, handle error case
  if (!movie) {
    return <div>Error: Movie details not available.</div>;
  }

  return (
    <>
       <h2 id="mtitle">{movie.title}</h2>
      <div className="movie-details">
        <img src={movie.backdrop_img} alt={movie.title} />
       
        <p>{movie.plot_overview}</p>
        <p>
          Release Date : <b>{movie.release_date}</b>
        </p>
        <p>
          Rating : <b>{movie.user_rating}</b>
        </p>
        <p>
          Genres : <b>{movie.genre_names.join(', ')}</b>
        </p>
        <p>
          Original Language : <b>{movie.original_language}</b>
        </p>
        <p>
          Original Title : <b>{movie.original_title}</b>
        </p>
        <p>
          Runtime : <b>{movie.runtime_minutes} minutes</b>
        </p>
        <p>
          Type : <b>{movie.type}</b>
        </p>

        {/* Thumbnail or trailer */}
        <br></br>
        <hr></hr>
        <br></br>
        <h3 id="yt">Watch Trailer</h3>
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
              src={movie.trailer_thumbnai}
              alt="Trailer Thumbnail"
              onClick={() => setShowTrailer(true)}
            />
          )}
        </div>
 <br></br>
 <br></br>
 <br></br>
        <hr></hr>
        <br></br>
        <p>Available on :</p>
        <ul>
          {movie.available_on.map((source, idx) => (
            <li key={idx}>
              {source.name} : {' '}
              <a id="source" href={source.web_url} target="_blank" rel="noopener noreferrer">
                {source.web_url}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      <button onClick={goBack}>Back to Search Results</button>
    </>
  );
}

export default MovieDetails;