import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '../services/movieApi'
import { useFavorites } from '../context/FavoritesContext'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    getMovieDetails(id).then((data) => setMovie(data))
  }, [id])

  if (!movie) {
    return <p className="p-6">Yükleniyor...</p>
  }

  const favorited = isFavorite(movie.id)

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-64 rounded-xl shadow-2xl mx-auto md:mx-0"
      />
      <div>
        <h2 className="text-3xl font-bold mb-2 text-white">{movie.title}</h2>
        <p className="text-yellow-400 mb-2">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="text-gray-400 mb-4">{movie.release_date}</p>
        <p className="max-w-xl mb-4 text-gray-300 leading-relaxed">{movie.overview}</p>

        <button
          onClick={handleFavoriteClick}
          className={`px-5 py-2.5 rounded-lg font-semibold transition ${
            favorited
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {favorited ? '❤️ Favorilerden Çıkar' : '🤍 Favorilere Ekle'}
        </button>
      </div>
    </div>
  )
}

export default MovieDetails