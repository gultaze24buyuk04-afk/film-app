const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";



// Popüler filmleri getir
export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=tr-TR`,
    {
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        accept: "application/json"
      }
    }
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
// 1. Adım: Request Token oluştur
export const createRequestToken = async () => {
  const response = await fetch(
    `${BASE_URL}/authentication/token/new`,
    {
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        accept: "application/json"
      }
    }
  );
  const data = await response.json();
  return data.request_token;
};

// 3. Adım: Onaylanmış token ile Session oluştur
export const createSession = async (requestToken) => {
  const response = await fetch(
    `${BASE_URL}/authentication/session/new`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ request_token: requestToken })
    }
  );
  const data = await response.json();
  return data.session_id;
};
// Hesap bilgilerini getir (session_id ile)
export const getAccountDetails = async (sessionId) => {
  const response = await fetch(
    `${BASE_URL}/account?session_id=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        accept: "application/json"
      }
    }
  );
  const data = await response.json();
  return data;
};
// Favoriye ekle veya çıkar
export const toggleFavorite = async (accountId, sessionId, movieId, favoriteStatus) => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite?session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite: favoriteStatus
      })
    }
  );
  const data = await response.json();
  return data;
};
// Favori filmleri TMDB'den getir
export const getFavoriteMovies = async (accountId, sessionId) => {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?session_id=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${READ_TOKEN}`,
        accept: "application/json"
      }
    }
  );
  const data = await response.json();
  return data.results;
};