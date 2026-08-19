import { createSlice } from '@reduxjs/toolkit'

const loadFavoritesFromStorage = () => {
  const saved = localStorage.getItem('favorites')
  return saved ? JSON.parse(saved) : []
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: loadFavoritesFromStorage(),
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload)
      localStorage.setItem('favorites', JSON.stringify(state))
    },
    removeFavorite: (state, action) => {
      const updated = state.filter((movie) => movie.id !== action.payload)
      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    },
  },
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer