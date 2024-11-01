import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import MovieWatch from './MovieWatch';

const MovieDetails = ({ movie, isDarkMode, onClose }) => {
  const [showMovieWatch, setShowMovieWatch] = useState(false);

  const handleWatchMovie = () => {
    setShowMovieWatch(true); // Show the MovieWatch component
  };

  const handleCloseWatch = () => {
    setShowMovieWatch(false); // Hide the MovieWatch component
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
        <div className={`relative rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-transform transform ${showMovieWatch ? 'scale-90' : 'scale-100'}`} style={{ zIndex: 51 }}>
          <div className={`flex justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-xl font-serif font-bold">{movie.title}</h2>
            <button onClick={onClose} className={`ml-2 w-8 h-8 flex justify-center items-center p-2 rounded-full ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'}`}>
              <RxCross2 />
            </button>
          </div>
          <div className="p-6 grid gap-6 md:grid-cols-2">
            <img className="min-w-full rounded-lg object-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className="space-y-4">
              <Info label="Rating" value={`${movie.vote_average.toFixed(1)}/10`} isDarkMode={isDarkMode} />
              <Info label="Release Date" value={movie.release_date} isDarkMode={isDarkMode} />
              <Info label="Language" value={movie.original_language.toUpperCase()} isDarkMode={isDarkMode} />
              <Info label="Overview" value={movie.overview} isDarkMode={isDarkMode} />
            </div>
          </div>
          <div className={`p-6 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <button className="w-full mb-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleWatchMovie}>
              Watch Movie
            </button>
            <div className="flex space-x-2">
              <select className={`block px-3 py-2 border-gray-300 rounded-md ${isDarkMode ? 'bg-zinc-500 text-white' : 'bg-gray-200 text-black'}`}>
                <option>Select quality</option>
                <option>1080p</option>
                <option>720p</option>
                <option>360p</option>
              </select>
              <button className="flex-1 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors">
                Download Movie
              </button>
            </div>
          </div>
        </div>
      </div>
      {showMovieWatch && (
        <div className="fixed inset-0 bg-black z-50">
          <MovieWatch movie={movie} isDarkMode={isDarkMode} onClose={handleCloseWatch} />
        </div>
      )}
    </>
  );
};
const Info = ({ label, value, isDarkMode }) => (
  <div>
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{value}</p>
  </div>
);

export default MovieDetails;
