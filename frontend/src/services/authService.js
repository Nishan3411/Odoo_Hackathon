import api from './api'

const TOKEN_KEY = 'token'
const USER_KEY = 'traveloop_user'

const authService = {
  async login({ email, password }) {
    const response = await api.post('/auth/login', { email, password })
    const payload = response.data?.data

    if (!payload?.token || !payload?.user) {
      throw new Error(response.data?.message || 'Invalid authentication response')
    }

    localStorage.setItem(TOKEN_KEY, payload.token)
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user))

    return payload
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  getUser() {
    const stored = localStorage.getItem(USER_KEY)
    if (!stored) return null
    try {
      return JSON.parse(stored)
    } catch (error) {
      console.error('Failed to parse stored user', error)
      return null
    }
  },
}

export default authService
