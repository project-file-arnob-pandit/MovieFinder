import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './Components/MovieCard';
import Navber from './Components/Navber';
import { LuSun } from "react-icons/lu";
import { BsMoonStarsFill } from "react-icons/bs";
import MovieDetails from './Components/MovieDetails';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [resetSearch, setResetSearch] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let key = "b71394cd13d80ad6d8cf2d34c075b584";

  const fetchMovies = async (page) => {
    setIsLoading(true);
    try {
      // Fetch three pages to get 60 movies (20 movies per page)
      const requests = [
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page}`),
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page + 1}`),
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page + 2}`)
      ];
      // Wait for all three requests to complete
      const responses = await Promise.all(requests);

      // Combine results from all pages and limit to 60 movies
      const movies = responses.flatMap(response => response.data.results).slice(0, 60);
      setMovies(movies);
      setTotalPages(responses[0].data.total_pages); // Assuming total_pages is the same across pages
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleCardClick = (movie) => setSelectedMovie(movie);
  const handleCloseDetails = () => setSelectedMovie(null);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleSearch = async (query) => {
    if (!query) return;
    setSearchQuery(query);
    setCurrentPage(1);
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&page=1`);
      setSearchResults(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(prev => prev + 1);
    if (direction === 'prev' && currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchQuery}&page=${currentPage}`);
          setSearchResults(response.data.results);
          setTotalPages(response.data.total_pages);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSearchResults();
    }
  }, [searchQuery, currentPage]);

  const moviesToDisplay = searchQuery ? searchResults : movies;

  const handleReset = () => {
    setMovies([]);
    setSearchResults([]);
    setSearchQuery('');  // Reset search query in the parent
    setCurrentPage(1);
    setResetSearch(true); // Trigger reset in Navbar
    fetchMovies(1);
  };



  return (
    <div className={`w-full min-h-screen p-3 flex flex-col items-center overflow-hidden ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <header className="w-full flex justify-between items-center mb-4 px-6 md:px-12">
        <h1
          className="text-[24px] md:text-[30px] cursor-pointer capitalize font-extralight"
          onClick={handleReset}
        >
          Movie
        </h1>

        <button onClick={toggleDarkMode} className={`w-8 h-8 p-2 text-[20px] flex justify-center items-center ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-200'} rounded`}>
          {isDarkMode ? <BsMoonStarsFill /> : <LuSun />}
        </button>
      </header>
      <Navber isDarkMode={isDarkMode} onSearch={handleSearch} resetSearch={resetSearch}
        setResetSearch={setResetSearch} />
      <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 overflow-hidden">
        {isLoading ? (
          <div className="col-span-full text-center">Loading...</div>
        ) : (
          moviesToDisplay.length > 0 ? moviesToDisplay.map(movie => (
            <div key={movie.id || movie.uniqueProperty} onClick={() => handleCardClick(movie)}>
              <MovieCard
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                description={movie.overview}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
                isDarkMode={isDarkMode}
              />
            </div>
          )) : <div className="col-span-full text-center">No results found for "{searchQuery}"</div>
        )}
        {selectedMovie && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 overflow-auto">
            <div className="w-full max-w-3xl bg-gray-800 text-white rounded-lg p-6 m-4 md:m-8 max-h-[90vh] overflow-y-auto">
              <MovieDetails movie={selectedMovie} isDarkMode={isDarkMode} onClose={handleCloseDetails} />
            </div>
          </div>
        )}

      </section>
      <div className="flex justify-between items-center w-full px-1 mt-4">
        <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}
          className={`py-2 px-4 rounded duration-300 ${isDarkMode ? 'hover:bg-zinc-600 text-white' : 'hover:bg-gray-200 text-black'}
           ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePagination('next')} disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded  duration-300 ${isDarkMode ? 'hover:bg-zinc-600 text-white' : 'hover:bg-gray-200 text-black'}
           ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>Next</button>
      </div>
    </div>
  );
};
export default App;
