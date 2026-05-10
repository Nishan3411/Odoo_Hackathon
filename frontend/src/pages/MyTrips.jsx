import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import TripCard from '../components/trip/TripCard'
import { trips as seedTrips } from '../data/mockData'
import { tripService } from '../services/api'

const USER_CREATED_TRIPS_KEY = 'userCreatedTrips'

function loadUserCreatedTrips() {
  try {
    const raw = localStorage.getItem(USER_CREATED_TRIPS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Failed to parse local trips', error)
    return []
  }
}

function mergeTrips(...sources) {
  const map = new Map()
  sources.flat().forEach((trip) => {
    if (!trip || trip.id == null) return
    map.set(trip.id.toString(), trip)
  })
  return Array.from(map.values())
}

function MyTrips() {
  const [trips, setTrips] = useState(() => mergeTrips(seedTrips, loadUserCreatedTrips()))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      try {
        const tripsData = await tripService.getTrips()
        const createdTrips = loadUserCreatedTrips()
        setTrips(mergeTrips(seedTrips, createdTrips, tripsData))
      } catch (loadError) {
        console.error('MyTrips load error', loadError)
        setTrips(mergeTrips(seedTrips, loadUserCreatedTrips()))
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Trips"
        title="My Trips"
        description="All draft, booked, and planning-stage itineraries in one place."
        action={<Link to="/create-trip"><Button icon={Plus}>New trip</Button></Link>}
      />
      <div className="mb-6 flex flex-wrap gap-2 rounded-lg premium-card p-3">
        {['All trips', 'Planning', 'Booked', 'Draft', 'Shared'].map((filter, index) => (
          <button key={filter} className={`rounded-lg px-4 py-2 text-sm font-black transition ${index === 0 ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-orange-700'}`}>{filter}</button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-3 rounded-lg premium-card p-6 text-slate-500">Loading trips...</div>
        ) : trips.length > 0 ? (
          trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
        ) : (
          <div className="col-span-3 rounded-lg premium-card p-6 text-slate-500">You have no trips yet. Create one to get started.</div>
        )}
      </div>
    </>
  )
}

export default MyTrips
