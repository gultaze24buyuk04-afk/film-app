import { createSlice } from '@reduxjs/toolkit'

const loadSessionFromStorage = () => {
  return localStorage.getItem('session_id') || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    sessionId: loadSessionFromStorage(),
    account: null,
  },
  reducers: {
    setSession: (state, action) => {
      state.sessionId = action.payload
      localStorage.setItem('session_id', action.payload)
    },
    setAccount: (state, action) => {
      state.account = action.payload
    },
    logout: (state) => {
      state.sessionId = null
      state.account = null
      localStorage.removeItem('session_id')
    },
  },
})

export const { setSession, setAccount, logout } = authSlice.actions
export default authSlice.reducer