import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getPopularMovies, searchMovies, getFavoriteMovies } from '../services/movieApi'
import MovieCard from '../components/MovieCard'
import Spinner from '../components/Spinner'

function Home() {
  const sessionId = useSelector((state) => state.auth.sessionId)
  const accountId = useSelector((state) => state.auth.account?.id)
  const location = useLocation()
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [favoriteIds, setFavoriteIds] = useState([])

  useEffect(() => {
    setLoading(true)
    getPopularMovies().then((data) => {
      setMovies(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (accountId && sessionId) {
      getFavoriteMovies(accountId, sessionId).then((data) => {
        setFavoriteIds(data.map((movie) => movie.id))
      })
    }
  }, [accountId, sessionId, location.key])

  const handleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    if (query.trim() === '') {
      getPopularMovies().then((data) => {
        setMovies(data)
        setLoading(false)
      })
      return
    }
    searchMovies(query).then((data) => {
      setMovies(data)
      setLoading(false)
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Film ara..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          Ara
        </button>
      </form>

      <h2 className="text-3xl font-bold mb-6 text-white">
        {query.trim() === '' ? '🔥 Popüler Filmler' : `🔎 "${query}" için sonuçlar`}
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorited={favoriteIds.includes(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home