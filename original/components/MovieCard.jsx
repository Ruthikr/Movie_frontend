import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white">
      <img
        src={movie.poster_img}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-lg mb-2"
      />
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p className="text-gray-700 mb-2">{movie.plot_overview}</p>
      <p>
        available on this platforms:
        {movie.genre_names[0]}
      </p>
      <Link
        to={`/movie/${movie.id}`}
        className="text-blue-500 hover:underline"
      >
        More Info
      </Link>
    </div>
  );
}

export default MovieCard;