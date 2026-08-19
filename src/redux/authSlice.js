import { createSlice } from '@reduxjs/toolkit'

const loadSessionFromStorage = () => {
  return localStorage.getItem('session_id') || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    sessionId: loadSessionFromStorage(),
  },
  reducers: {
    setSession: (state, action) => {
      state.sessionId = action.payload
      localStorage.setItem('session_id', action.payload)
    },
    logout: (state) => {
      state.sessionId = null
      localStorage.removeItem('session_id')
    },
  },
})

export const { setSession, logout } = authSlice.actions
export default authSlice.reducer