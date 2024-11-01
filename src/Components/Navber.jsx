import React, { useState } from 'react';

const Navbar = ({ isDarkMode, onSearch }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) {
      // Trigger the search action (could call an API or update a parent component's state)
      onSearch(input);
    }
  };

  return (
    <div className="w-[90%] flex gap-2 px-4">
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Search movie..."
        className={`w-full py-2 px-3 font-serif border outline-none rounded-md shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}
      />
      <button
        onClick={handleSearch}
        className={`px-4 capitalize font-serif rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}
      >
        Search
      </button>
    </div>
  );
};

export default Navbar;
