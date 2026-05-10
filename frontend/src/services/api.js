import axios from 'axios'
import { activities, budgetBreakdown, checklist, cities, notes, stops, trips } from '../data/mockData'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const tripService = {
  getTrips: async () => trips,
  getTripById: async (id) => trips.find((trip) => trip.id === id) || trips[0],
  getStops: async () => stops,
  getActivities: async () => activities,
  getCities: async () => cities,
  getBudget: async () => budgetBreakdown,
  getChecklist: async () => checklist,
  getNotes: async () => notes,
}

export default api
