import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMovieDetails } from '../services/movieApi'
import { addFavorite, removeFavorite } from '../redux/favoritesSlice'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)
  const sessionId = useSelector((state) => state.auth.sessionId)

  useEffect(() => {
    getMovieDetails(id).then((data) => setMovie(data))
  }, [id])

  if (!movie) {
    return <p className="p-6">Yükleniyor...</p>
  }

  const favorited = favorites.some((m) => m.id === movie.id)

  const handleFavoriteClick = () => {
    if (!sessionId) {
      alert('Favorilere eklemek için önce giriş yapmalısın.')
      navigate('/login')
      return
    }

    if (favorited) {
      dispatch(removeFavorite(movie.id))
    } else {
      dispatch(addFavorite(movie))
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