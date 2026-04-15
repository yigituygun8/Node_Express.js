import { useState, useEffect, useRef } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard';
import './App.css';
import Spinner from './components/Spinner';
import { updateSearchCount, getTrendingMovies } from './appwrite';
import { Link, useSearchParams } from 'react-router';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [searchTerm, setSearchTerm] = useState(initialQuery); // State to hold the search term
  // We did not put it in Search component because we want to use it in App component as well, for example to display the search term in the header or to pass it to other
  // We will pass the searchTerm and setSearchTerm as props to the Search component so that it can update the search term when the user types in the search input
  const [debouncedSearch, setDebouncedSearch] = useState(initialQuery); // State to hold the debounced search term, which will be updated after a delay when the user stops typing. This helps to reduce the number of API calls and improve performance.

  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [paginationPage, setPaginationPage] = useState(initialPage); // State to hold the current page number for pagination. We will use this state to fetch the next page of movies when the user clicks on the "Load More" button.
  const [totalPages, setTotalPages] = useState(1); // State to hold the total number of pages available for the current search term. We will use this state to determine whether to show the "Load More" button or not, based on whether there are more pages to load.
  const previousDebouncedSearch = useRef(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm); // update the debounced search term after a delay of 500ms
    }, 500);
    return () => clearTimeout(timer); // clear the timer if the component unmounts or if the searchTerm changes before the timer finishes, to prevent memory leaks and unnecessary updates (cleanup function)
  }, [searchTerm]); // this useEffect hook will run whenever the searchTerm state changes, and it will set a timer to update the debouncedSearch state after 500ms. If the searchTerm changes again before the timer finishes, the previous timer will be cleared and a new one will be set.
  
  // Instead of this manual useEffect debouncing, we can npm install react-use and use the useDebounce hook from that library, which provides a cleaner and more efficient way to handle debouncing in React. It abstracts away the timer logic and provides a simple interface for debouncing any value.
  // useDebounce(() => setDebouncedSearch(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "", page = 1) => {
    try {
      setIsLoading(true); // set loading state to true before starting the fetch
      setErrorMessage(''); // clear any previous error messages before starting the fetch
      
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // fetch does not throw an error for HTTP errors (like 404 or 500), so we need to check the response status and throw an error ourselves if it's not ok. It throws an error for network errors (like no internet connection), but not for HTTP errors.
      }

      const data = await response.json(); // convert the JSON to a JavaScript object

      setMovies(data.results || []); // set the movies state with the results from the API, or an empty array if there are no results
      setTotalPages(Math.min(data.total_pages || 1, 500)); // set the total pages state with the total number of pages available for the current search term, but limit it to 500 because TMDB API does not allow fetching beyond page 500. This allows us to determine whether to show the "Load More" button or not, based on whether there are more pages to load.

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
    fetchMovies(debouncedSearch, paginationPage);
  }, [debouncedSearch, paginationPage]); // whenever the debouncedSearch state changes, the useEffect hook will run the fetchMovies function to fetch movies based on the new search term. This allows us to update the movie list whenever the user types in a new search term.

  useEffect(() => {
    loadTrendingMovies(); // load the trending movies when the component mounts
  }, []);

  useEffect(() => {
    // Keep URL and state in sync when navigation happens (back/forward or shared links).
    const queryFromUrl = searchParams.get("q") || "";
    const pageFromUrl = Math.max(1, Number(searchParams.get("page")) || 1);

    setSearchTerm(prev => prev === queryFromUrl ? prev : queryFromUrl);
    setDebouncedSearch(prev => prev === queryFromUrl ? prev : queryFromUrl);
    setPaginationPage(prev => prev === pageFromUrl ? prev : pageFromUrl);
  }, [searchParams]);

  useEffect(() => {
    // Reset to page 1 only when the search query actually changes.
    if (previousDebouncedSearch.current === debouncedSearch) {
      return;
    }

    previousDebouncedSearch.current = debouncedSearch;
    setPaginationPage(1);

    const nextParams = { page: '1' };
    if (debouncedSearch.trim()) {
      nextParams.q = debouncedSearch.trim();
    }

    setSearchParams(nextParams, { replace: true });
  }, [debouncedSearch, setSearchParams]);

  const goToPage = (nextPage) => {
    const safePage = Math.max(1, Math.min(nextPage, totalPages));
    setPaginationPage(safePage);

    const nextParams = { page: String(safePage) };
    if (debouncedSearch.trim()) {
      nextParams.q = debouncedSearch.trim();
    }

    setSearchParams(nextParams);
  };
  
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
          {!isLoading && !errorMessage && totalPages > 1 && (
            <div className='pagination-controls'>
              <button
                type='button'
                onClick={() => goToPage(paginationPage - 1)}
                disabled={paginationPage === 1}
              >
                Previous
              </button>

              <p className='pagination-status'>Page {paginationPage} of {totalPages}</p>

              <button
                type='button'
                onClick={() => goToPage(paginationPage + 1)}
                disabled={paginationPage >= totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default App