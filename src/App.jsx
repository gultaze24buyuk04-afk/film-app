import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import { getAccountDetails } from './services/movieApi'
import { setAccount } from './redux/authSlice'

function App() {
  const dispatch = useDispatch()
  const sessionId = useSelector((state) => state.auth.sessionId)
  const account = useSelector((state) => state.auth.account)

  useEffect(() => {
    if (sessionId && !account) {
      getAccountDetails(sessionId).then((data) => {
        dispatch(setAccount(data))
      })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App