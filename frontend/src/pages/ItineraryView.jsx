import { useEffect, useState } from 'react'
import { CalendarDays, MapPinned, Share2, WalletCards } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import StopCard from '../components/trip/StopCard'
import { tripService } from '../services/api'
import { currency } from '../utils/formatters'

function ItineraryView() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [stops, setStops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadItinerary = async () => {
      setLoading(true)
      setError('')

      try {
        const [tripData, stopsData] = await Promise.all([
          tripService.getTripById(tripId),
          tripService.getStops(tripId),
        ])

        if (!tripData) {
          setError('Trip not found.')
          return
        }

        setTrip(tripData)
        setStops(stopsData)
      } catch (loadError) {
        console.error('Itinerary view load error', loadError)
        setError('Unable to load itinerary details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadItinerary()
  }, [tripId])

  if (loading) {
    return <div className="rounded-lg premium-card p-6 text-slate-500">Loading itinerary...</div>
  }

  if (error || !trip) {
    return <div className="rounded-lg premium-card p-6 text-rose-700">{error || 'Trip not found.'}</div>
  }

  const dateRange = trip.startDate && trip.endDate ? `${trip.startDate} - ${trip.endDate}` : 'Dates TBD'

  return (
    <>
      <PageHeader
        eyebrow="Itinerary"
        title={trip.title}
        description={`${dateRange} · ${stops.length} stops`}
        action={<Link to={`/public/${trip.id}`}><Button icon={Share2} variant="accent">Share public link</Button></Link>}
      />
      <section className="overflow-hidden rounded-lg premium-card">
        <div className="relative h-72 bg-slate-200">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-200">Trip overview</p>
            <h2 className="mt-1 text-3xl font-black">{trip.title}</h2>
          </div>
        </div>
        <div className="grid gap-3 border-b border-slate-100 p-5 md:grid-cols-3">
          <div className="booking-field"><CalendarDays className="h-4 w-4 text-sky-600" /><p className="mt-2 text-sm font-black">{dateRange}</p></div>
          <div className="booking-field"><MapPinned className="h-4 w-4 text-orange-600" /><p className="mt-2 text-sm font-black">{stops.length} stops</p></div>
          <div className="booking-field"><WalletCards className="h-4 w-4 text-teal-600" /><p className="mt-2 text-sm font-black">{currency(trip.budget || 0)}</p></div>
        </div>
        <div className="grid gap-4 p-5">
          {stops.length > 0 ? stops.map((stop, index) => <StopCard key={stop.id || index} stop={stop} index={index} />) : (
            <div className="rounded-lg premium-card p-8 text-center text-slate-600">
              <p className="text-lg font-semibold">No stops added yet.</p>
              <p className="mt-2 text-sm">Add your first stop in the itinerary builder to populate your trip details.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ItineraryView
