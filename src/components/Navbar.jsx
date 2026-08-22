import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
  const sessionId = useSelector((state) => state.auth.sessionId)
  const account = useSelector((state) => state.auth.account)

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-red-500 tracking-wide">
          🎬 Film Rehberi
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-red-400 transition font-medium">
            Ana Sayfa
          </Link>

          {sessionId && (
            <Link to="/favorites" className="hover:text-red-400 transition font-medium">
              Favorilerim
            </Link>
          )}

          {sessionId ? (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition"
            >
              <span className="text-xl">👤</span>
              <span className="font-medium">{account ? account.username : 'Profil'}</span>
            </Link>
          ) : (
            <Link to="/login" className="hover:text-red-400 transition font-medium">
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar