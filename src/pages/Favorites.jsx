import { useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'

function Favorites() {
  const favorites = useSelector((state) => state.favorites)

  if (favorites.length === 0) {
    return <p className="p-6 text-gray-400 text-lg">Henüz favori film eklemedin.</p>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">❤️ Favorilerim</h2>
      <div className="flex flex-wrap gap-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Favorites