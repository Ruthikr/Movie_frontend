import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={movie.poster_img}
        alt={movie.title}
        className="w-1/2 md:w-1/4 mb-4"
      />
      <p className="text-lg mb-4">{movie.plot_overview}</p>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Details</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Genre:</strong> {movie.genre_names}</p>
        <p><strong>Rating:</strong> {movie.user_rating}</p>
        {/* Add more details here */}
      </div>
    </div>
  );
}

export default MovieDetailsPage;