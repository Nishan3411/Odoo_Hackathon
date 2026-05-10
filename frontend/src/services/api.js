import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const tripService = {
  getTrips: async () => {
    const response = await api.get('/trips')
    return response.data?.data?.trips || []
  },
  getTripById: async (id) => {
    const response = await api.get(`/trips/${id}`)
    return response.data?.data?.trip || null
  },
  createTrip: async (tripPayload) => {
    const response = await api.post('/trips', tripPayload)
    return response.data?.data?.trip || null
  },
  getStops: async (tripId) => {
    const response = await api.get(`/trips/${tripId}/stops`)
    return response.data?.data?.stops || []
  },
  getActivitiesForTrip: async (tripId) => {
    const response = await api.get(`/trips/${tripId}/stops`)
    const stops = response.data?.data?.stops || []
    const activitiesPerStop = await Promise.all(
      stops.map(async (stop) => {
        const activitiesResponse = await api.get(`/activities/stops/${stop.id}/activities`)
        return activitiesResponse.data?.data?.activities || []
      })
    )

    return activitiesPerStop.flat()
  },
}

export default api
