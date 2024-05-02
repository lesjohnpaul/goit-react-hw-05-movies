import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from 'service/theMovieDbApi';
import MovieList from 'components/MovieList/MovieList';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchTrendingMoviesData = async () => {
      try {
        const result = await fetchTrendingMovies();
        setMovies(result);
        setError(null); // Clearing error state on successful fetch
      } catch (error) {
        setError('Failed to fetch movies');
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingMoviesData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.homeContainer}>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>No trending movies available.</p>
      )}
    </div>
  );
};

export default Home;
