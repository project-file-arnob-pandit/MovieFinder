import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

function MovieWatch({ movie, onClose, isDarkMode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  function handlePlayPause() {
    setIsPlaying(!isPlaying);
  }

  function handleMute() {
    setIsMuted(!isMuted);
  }

  function handleProgressChange(event) {
    setProgress(event.target.value);
  }
  return (
    <div className={`w-full min-h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <RxCross2 size={28} />
          </button>
        </div>

        <div className="relative aspect-video bg-black mb-4 rounded-lg overflow-hidden shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex items-center justify-between">
            <button 
              onClick={handlePlayPause} 
              className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
              {isPlaying ? <FaPause size={24} className="text-white" /> : <FaPlay size={24} className="text-white" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full mx-4 cursor-pointer appearance-none h-1 bg-gray-300 rounded-lg"
              style={{ outline: 'none' }}
            />
            <button 
              onClick={handleMute} 
              className="bg-gray-600 p-2 rounded-full hover:bg-gray-700 transition">
              {isMuted ? <FaVolumeMute size={24} className="text-white" /> : <FaVolumeUp size={24} className="text-white" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieWatch;
