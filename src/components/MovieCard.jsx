import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toggleFavorite } from '../services/movieApi'
import { useState, useEffect } from 'react'

function MovieCard({ movie, isFavorited = false, onFavoriteChange }) {
  const navigate = useNavigate()
  const sessionId = useSelector((state) => state.auth.sessionId)
  const accountId = useSelector((state) => state.auth.account?.id)
  const [favorited, setFavorited] = useState(isFavorited)

  useEffect(() => {
    setFavorited(isFavorited)
  }, [isFavorited])

  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!sessionId) {
      alert('Favorilere eklemek için önce giriş yapmalısın.')
      navigate('/login')
      return
    }

    const newStatus = !favorited
    await toggleFavorite(accountId, sessionId, movie.id, newStatus)
    setFavorited(newStatus)

    if (onFavoriteChange) {
      onFavoriteChange()
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