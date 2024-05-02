import axios from 'axios';

const successToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDRkNjQ5YmYyOWIxM2YxNWY3YzA5ZTNhN2M1MDRkZCIsInN1YiI6IjY1ZDM1NDQ3MmRhODQ2MDE4NTI2MzE1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TDx983zsZiX2YGdKyqnHoNB0tBfNTgYu5H9MjFWr_fE';

const baseUrl = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const {
    data: { results },
  } = await axios(`${baseUrl}/trending/movie/day`, {
    headers: { Authorization: `Bearer ${successToken}` },
  });
  return results;
};
export const fetchMovieDetailsById = async id => {
  const { data } = await axios(`${baseUrl}/movie/${id}`, {
    headers: { Authorization: `Bearer ${successToken}` },
  });
  return data;
};

export const fetchCreditsByMovieId = async id => {
  const { data } = await axios(`${baseUrl}/movie/${id}/credits`, {
    headers: { Authorization: `Bearer ${successToken}` },
  });
  return data.cast;
};
export const fetchReviewsByMovieId = async id => {
  const { data } = await axios(`${baseUrl}/movie/${id}/reviews`, {
    headers: { Authorization: `Bearer ${successToken}` },
  });
  return data.results;
};
export const fetchMoviesByQuery = async query => {
  const { data } = await axios(`${baseUrl}/search/movie?query=${query}`, {
    headers: { Authorization: `Bearer ${successToken}` },
  });
  return data.results;
};
