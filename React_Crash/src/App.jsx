import { useState, useEffect } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard';
import './App.css';
import Spinner from './components/Spinner';

const API_BASE_URL = "https://api.themoviedb.org/3"; // Base URL for TMDB API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_KEY // bearer token proves you are authorized to access an API
  }
}
const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  // We did not put it in Search component because we want to use it in App component as well, for example to display the search term in the header or to pass it to other
  // We will pass the searchTerm and setSearchTerm as props to the Search component so that it can update the search term when the user types in the search input
  
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async() => {
    try {
      setIsLoading(true); // set loading state to true before starting the fetch
      setErrorMessage(''); // clear any previous error messages before starting the fetch
      
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // fetch does not throw an error for HTTP errors (like 404 or 500), so we need to check the response status and throw an error ourselves if it's not ok. It throws an error for network errors (like no internet connection), but not for HTTP errors.
      }

      const data = await response.json(); // convert the JSON to a JavaScript object

      setMovies(data.results || []); // set the movies state with the results from the API, or an empty array if there are no results
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false); // set loading state to false in the finally block to ensure it happens regardless of success or error
    }
  }
  
  useEffect(() => {
    fetchMovies();
  }, []); // empty dependency array - run only once when the component mounts

  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src="/hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Great</span> Movies You'll Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="all-movies">
            <h2 className='mt-10'>All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} /> // pass the movie object as a prop to the MovieCard component so that it can display the movie details. We also need to add a key prop with a unique value (like movie.id) to help React identify each element in the list and optimize rendering.
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default App