import React, { Suspense, useRef, useState, useEffect } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetailsById } from 'service/theMovieDbApi';
import { Loader } from 'components/Loader/Loader';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backPath = useRef(location.state?.from || '/');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchMovieDetailsById(movieId);
        if (result) {
          setMovie(result);
          setError(null);
        } else {
          throw new Error('Movie not found');
        }
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error.message);
      }
    };
    fetchData();
  }, [movieId]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Link to={backPath.current} className={styles.goBackLink}>
        Go Back
      </Link>
      {movie ? (
        <div className={styles.movieContent}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://live.staticflickr.com/65535/51349451747_f6d7898f2c_n.jpg'
            }
            alt={movie.title}
            className={styles.moviePoster}
          />
          <h3 className={styles.movieTitle}>{movie.title}</h3>
          <p className={styles.movieRating}>
            Rating: {movie.vote_average.toFixed(2)}
          </p>
          <p className={styles.movieOverview}>{movie.overview}</p>
          <p className={styles.movieGenres}>
            Genres: {movie.genres.map(({ name }) => name).join(', ')}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="cast">Casts</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense
        fallback={
          <div className={styles.loader}>
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
