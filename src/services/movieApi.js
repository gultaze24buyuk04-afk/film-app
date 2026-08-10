const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Popüler filmleri getir
export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  return data.results;
};

// Film ara
export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=tr-TR&query=${query}`
  );
  const data = await response.json();
  return data.results;
};

// Film detayını getir
export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=tr-TR`
  );
  const data = await response.json();
  return data;
};