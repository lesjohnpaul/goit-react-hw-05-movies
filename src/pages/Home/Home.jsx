import { useEffect } from 'react';
import { fetchTrendingMovies } from 'service/theMovieDbApi';
import { useState } from 'react';
import MovieList from 'components/MovieList/MovieList';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const fetchTrendingMoviesData = async () => {
      try {
        const result = await fetchTrendingMovies();
        setMovies(result);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };
    fetchTrendingMoviesData();
  }, []);
  return (
    <div className={styles.homeContainer}>
      {movies && <MovieList movies={movies} />}
    </div>
  );
};
export default Home;
