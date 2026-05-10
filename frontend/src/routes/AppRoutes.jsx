import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import ActivitySearch from '../pages/ActivitySearch'
import AdminDashboard from '../pages/AdminDashboard'
import Budget from '../pages/Budget'
import CitySearch from '../pages/CitySearch'
import CreateTrip from '../pages/CreateTrip'
import Dashboard from '../pages/Dashboard'
import ItineraryBuilder from '../pages/ItineraryBuilder'
import ItineraryView from '../pages/ItineraryView'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import MyTrips from '../pages/MyTrips'
import PackingChecklist from '../pages/PackingChecklist'
import Profile from '../pages/Profile'
import PublicItinerary from '../pages/PublicItinerary'
import Signup from '../pages/Signup'
import TripNotes from '../pages/TripNotes'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/public/:tripId" element={<PublicItinerary />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/builder" element={<ItineraryBuilder />} />
        <Route path="/builder/:tripId" element={<ItineraryBuilder />} />
        <Route path="/itinerary/:tripId" element={<ItineraryView />} />
        <Route path="/cities" element={<CitySearch />} />
        <Route path="/activities" element={<ActivitySearch />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/packing" element={<PackingChecklist />} />
        <Route path="/notes" element={<TripNotes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes
