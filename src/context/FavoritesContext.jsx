import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => {
    setFavorites((prev) => [...prev, movie])
  }

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some((m) => m.id === movieId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}