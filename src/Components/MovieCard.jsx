import React from 'react';

const MovieCard = ({ title, imageUrl, rating, description, releaseDate }) => {
  return (
    <div className="w-full relative rounded cursor-pointer  hover:scale-90 duration-300">
      <img
        className='w-full object-cover rounded h-full'
        src={imageUrl}
        alt={title}
      />
      {/* image hover details show */}
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
        <h3 className="text-lg font-extralight mb-1">{title}</h3>
        <p className="text-sm">Rating: {rating ? rating.toFixed(1) : "N/A"}/10</p>
        <p className="text-sm">{releaseDate}</p>
      </div>
    </div>
  );
};
export default MovieCard;
