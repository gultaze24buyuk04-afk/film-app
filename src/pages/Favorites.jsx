import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getFavoriteMovies } from '../services/movieApi'
import MovieCard from '../components/MovieCard'
import Spinner from '../components/Spinner'

function Favorites() {
  const sessionId = useSelector((state) => state.auth.sessionId)
  const accountId = useSelector((state) => state.auth.account?.id)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFavorites = () => {
    if (accountId && sessionId) {
      setLoading(true)
      getFavoriteMovies(accountId, sessionId).then((data) => {
        setFavorites(data)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [accountId, sessionId])

  if (loading) {
    return <Spinner />
  }

  if (favorites.length === 0) {
    return <p className="p-6 text-gray-400 text-lg">Henüz favori film eklemedin.</p>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">❤️ Favorilerim</h2>
      <div className="flex flex-wrap gap-4">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorited={true}
            onFavoriteChange={fetchFavorites}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites