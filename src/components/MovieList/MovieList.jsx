import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={styles.container}>
      <ul>
        {movies.map(({ title, id, poster_path }) => (
          <li key={id} className={styles['movie-list-item']}>
            <Link
              to={`/movies/${id}`}
              state={{ background: location }}
              className={styles['movie-link']}
            >
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w185${poster_path}`
                    : 'https://live.staticflickr.com/65535/51349451747_f6d7898f2c_n.jpg'
                }
                alt={title}
                className={styles.moviePoster}
              />
              <div>{title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
