import { useState, useEffect } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard';
import './App.css';
import Spinner from './components/Spinner';
import { updateSearchCount, getTrendingMovies } from './appwrite';
import { Link } from 'react-router';

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
  const [debouncedSearch, setDebouncedSearch] = useState(""); // State to hold the debounced search term, which will be updated after a delay when the user stops typing. This helps to reduce the number of API calls and improve performance.

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm); // update the debounced search term after a delay of 500ms
    }, 500);
    return () => clearTimeout(timer); // clear the timer if the component unmounts or if the searchTerm changes before the timer finishes, to prevent memory leaks and unnecessary updates (cleanup function)
  }, [searchTerm]); // this useEffect hook will run whenever the searchTerm state changes, and it will set a timer to update the debouncedSearch state after 500ms. If the searchTerm changes again before the timer finishes, the previous timer will be cleared and a new one will be set.
  
  // Instead of this manual useEffect debouncing, we can npm install react-use and use the useDebounce hook from that library, which provides a cleaner and more efficient way to handle debouncing in React. It abstracts away the timer logic and provides a simple interface for debouncing any value.
  // useDebounce(() => setDebouncedSearch(searchTerm), 500, [searchTerm]);

  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchMovies = async (query = "") => {
    try {
      setIsLoading(true); // set loading state to true before starting the fetch
      setErrorMessage(''); // clear any previous error messages before starting the fetch
      
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // fetch does not throw an error for HTTP errors (like 404 or 500), so we need to check the response status and throw an error ourselves if it's not ok. It throws an error for network errors (like no internet connection), but not for HTTP errors.
      }

      const data = await response.json(); // convert the JSON to a JavaScript object

      setMovies(data.results || []); // set the movies state with the results from the API, or an empty array if there are no results

      if(query && data.results.length > 0)  {
        await updateSearchCount(query, data.results[0]); // call the updateSearchCount function to update the search count in Appwrite whenever we fetch movies. This allows us to track how many times users have searched for movies in our app.
      }

    } catch (error) {
      console.error("Error fetching movies: ", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false); // set loading state to false in the finally block to ensure it happens regardless of success or error
    }
  } // fetchMovies

  const loadTrendingMovies = async () => {
    try {
      const result = await getTrendingMovies(); // call the getTrendingMovies function to fetch the trending movies from Appwrite. This function should return the top 5 trending movies based on the search count in our database.
      setTrendingMovies(result.rows); // update the trendingMovies state with the fetched results
    } catch (error) {
      console.error("Error loading trending movies: ", error);
    }
  }; // loadTrendingMovies
  
  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]); // whenever the debouncedSearch state changes, the useEffect hook will run the fetchMovies function to fetch movies based on the new search term. This allows us to update the movie list whenever the user types in a new search term.

  useEffect(() => {
    loadTrendingMovies(); // load the trending movies when the component mounts
  }, []);
  
  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src="/hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Great</span> Movies You'll Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <Link key={movie.$id} to={`/movie/${movie.movie_id}`}>
                    <li>
                      <p>{index + 1}</p>
                      <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  </Link>
                ))}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <h2>All Movies</h2>
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