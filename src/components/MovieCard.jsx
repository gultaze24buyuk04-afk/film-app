import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(movie.id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorited) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-3 w-48 shadow-lg hover:shadow-2xl hover:scale-105 hover:border-red-500 transition-all duration-300 cursor-pointer">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-5 right-5 text-2xl z-10 hover:scale-125 transition"
        >
          {favorited ? '❤️' : '🤍'}
        </button>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full rounded-lg"
        />
        <h3 className="text-base font-semibold mt-2 text-white truncate">{movie.title}</h3>
        <p className="text-yellow-400 text-sm mt-1">⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </Link>
  )
}

export default MovieCard