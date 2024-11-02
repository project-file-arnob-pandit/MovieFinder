import React, { useEffect, useState } from 'react';

const Navbar = ({ isDarkMode, onSearch, resetSearch, setResetSearch }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resetSearch) {
      setInput('');       // Clear the input field
      setResetSearch(false); // Reset the resetSearch flag in the parent
    }
  }, [resetSearch, setResetSearch]);

  const handleSearch = async () => {
    if (input.trim()) {
      setLoading(true); // Start loading
      onSearch(input);  // Trigger the search action (API call or other action)
      // Simulate a search delay for effect (e.g., for an API call)
      setTimeout(() => {
        setLoading(false); // Stop loading after search is done
      }, 500);
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
        disabled={loading}
        className={`px-4 capitalize font-serif rounded-md flex items-center justify-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}
      >
        {loading ? (
          <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4"></span>
        ) : (
          'Search'
        )}
      </button>
    </div>
  );
};

export default Navbar;
