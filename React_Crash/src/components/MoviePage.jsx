import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router";
import Spinner from './Spinner';

const API_BASE_URL = "https://api.themoviedb.org/3"; // Base URL for TMDB API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + API_KEY // bearer token proves you are authorized to access an API
  }
}

const MoviePage = () => {
  const { id } = useParams(); // get the movie id for fetching movie details
  const [movie, setMovie] = useState(null); // state to hold the movie details
  const [cast, setCast] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async() => {
      try {
        setloading(true);
        const endpoint = `${API_BASE_URL}/movie/${id}`; // endpoint for fetching movie details by id
        const res = await fetch(endpoint, API_OPTIONS);

        if(!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); // fetch does not throw an error for HTTP errors (like 404 or 500), so we need to check the response status and throw an error ourselves if it's not ok. It throws an error for network errors (like no internet connection), but not for HTTP errors.
        }
        const data = await res.json(); // convert the JSON to a JavaScript object
        setMovie(data); 
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      } finally {
        setloading(false);
      }
    };
    fetchMovieDetails();
  }, [id]); 
  // We put the fetchMovieDetails function inside the useEffect hook because we want to fetch the movie details whenever the component mounts or whenever the id parameter changes (when the user navigates to a different movie page).
  // By including id in the dependency array of the useEffect hook, we ensure that the effect runs again whenever the id changes, allowing us to fetch and display the details of the new movie. If we didn't include id in the dependency array, the effect would only run once when the component mounts, and it would not update when the user navigates to a different movie page.
 

  // Fetch for cast / crew
  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        setloading(true);
        const endpoint = `${API_BASE_URL}/movie/${id}/credits`; // endpoint for fetching movie credits (cast and crew) by movie id
        const res = await fetch(endpoint, API_OPTIONS);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching movie credits: ", error);
      } finally {
        setloading(false);
      }
    };
    fetchMovieCredits();
  }, [id]); 

  const {title, vote_average, poster_path, release_date, original_language, genres} = movie || {}; // destructure the movie details from the movie state, and provide default values to avoid errors when movie is null

  return (
    <div className='text-white mt-10 px-4 pb-12'>
      <h1 className='text-center text-4xl font-bold sm:text-5xl lg:text-6xl'>{movie ? title : "Movie Not Found"}</h1>
      {loading ? <Spinner /> : (
        movie ? (
          <div className='relative mx-auto mt-8 flex max-w-6xl flex-col gap-10 rounded-2xl bg-white/5 p-4 shadow-2xl shadow-black/30 lg:flex-row lg:p-8'>
            <img
              src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/no-movie.png'}
              alt={title}
              className='w-full rounded-xl object-cover lg:w-1/3'
            />
            <div className='movie-details'>
              <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm sm:text-base'>
                <p>Rating: {vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                <p>
                  Release Date: {release_date ? new Date(release_date).toLocaleDateString("en-GB", {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }) : 'N/A'}
                </p>
                <p>Language: {original_language ? original_language.toUpperCase() : 'N/A'}</p>
                <p className='flex flex-wrap items-center gap-2'>
                  Genres: {genres ? genres.map((genre) => <span key={genre.id} className='genre-box'>{genre.name}</span>) : 'N/A'}
                </p>
              </div> {/* end of metadata row */}
              <h3>Movie Description:</h3>
              <p className='max-w-3xl whitespace-normal leading-7 text-white/90'>
                {movie ? movie.overview : 'N/A'}  
              </p>
              <h3>Cast:</h3>
              <div className='flex flex-wrap gap-6'>
                  {cast.length > 0 ? cast.slice(0, 5).map((member) => (
                    <div key={member.cast_id} className='cast-member'>
                      <img src={`https://image.tmdb.org/t/p/w185${member.profile_path}`} alt={member.name} className='h-60 w-full rounded-lg object-cover' />
                      <span key={member.cast_id} className='mt-2 text-sm leading-5 wrap-break-word line-clamp-2'>{member.name} as {member.character}</span>
                    </div>
                  )) : 'N/A'}
              </div>
            </div> {/* end of movie details and description */}
            <Link to="/" className="absolute right-4 bottom-4 mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Back to Movies List
            </Link>
          </div>
        ) : <p>Movie details not found.</p>
      )}
    </div>
  )
}

export default MoviePage