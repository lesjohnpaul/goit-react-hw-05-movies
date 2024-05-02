import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewsByMovieId } from 'service/theMovieDbApi';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchReviewsByMovieId(movieId);
        setReviews(result);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };
    fetchData();
  }, [movieId]);

  const handleReadMore = author => {
    setExpandedReviews(prevExpandedReviews => [...prevExpandedReviews, author]);
  };

  return (
    <ul className={styles['reviews-container']}>
      {reviews && reviews.length > 0 ? (
        reviews.map(({ author, content }) => {
          const isShortReview = content.split('\n').length <= 3;

          return (
            <li key={author} className={styles['review-item']}>
              <h3 className={styles['review-author']}>{author}</h3>
              <p className={styles['review-content']}>
                {expandedReviews.includes(author) || isShortReview
                  ? content
                  : `${content.slice(0, 150)}...`}
                {!expandedReviews.includes(author) && !isShortReview && (
                  <button
                    onClick={() => handleReadMore(author)}
                    className={styles['read-more']}
                  >
                    Read more
                  </button>
                )}
              </p>
            </li>
          );
        })
      ) : (
        <li className={styles['read-more-loader']}>There are no reviews so far ...</li>
      )}
    </ul>
  );
};

export default Reviews;