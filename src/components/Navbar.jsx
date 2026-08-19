import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-red-500 tracking-wide">
          🎬 Film Rehberi
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-red-400 transition font-medium">
            Ana Sayfa
          </Link>
          <Link to="/favorites" className="hover:text-red-400 transition font-medium">
            Favorilerim
          </Link>
          <Link to="/login" className="hover:text-red-400 transition font-medium">
            Giriş Yap
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar