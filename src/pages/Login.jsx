import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createRequestToken } from '../services/movieApi'
import { setSession, logout } from '../redux/authSlice'
import { useEffect } from 'react'
import { createSession } from '../services/movieApi'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionId = useSelector((state) => state.auth.sessionId)

  const handleLogin = async () => {
    const requestToken = await createRequestToken()
    localStorage.setItem('pending_request_token', requestToken)
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/login`
  }

  useEffect(() => {
    const approvedToken = localStorage.getItem('pending_request_token')

    const finishLogin = async () => {
      const newSessionId = await createSession(approvedToken)
      dispatch(setSession(newSessionId))
      localStorage.removeItem('pending_request_token')
      navigate('/')
    }

    if (approvedToken && window.location.search.includes('approved=true')) {
      finishLogin()
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  if (sessionId) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Giriş Yapıldı ✅</h2>
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          Çıkış Yap
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Giriş Yap</h2>
      <p className="text-gray-400 mb-6">
        Favorilere film ekleyebilmek için TMDB hesabınla giriş yapmalısın.
      </p>
      <button
        onClick={handleLogin}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
      >
        TMDB ile Giriş Yap
      </button>
    </div>
  )
}

export default Login