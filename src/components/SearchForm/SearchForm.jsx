import { useSearchParams } from 'react-router-dom';
import styles from './SearchForm.module.css';

const SearchForm = () => {
  const [, setSearchParams] = useSearchParams();

  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    if (!query) return;
    setSearchParams({ query });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <label htmlFor="searchQuery">
        <input
          type="text"
          name="searchQuery"
          id="searchQuery"
          className={styles.searchInput}
          placeholder="Search for movies..."
        />
      </label>
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;