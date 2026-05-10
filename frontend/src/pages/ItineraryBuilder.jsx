import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarPlus, CheckCircle2, Plus, Share2 } from 'lucide-react'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import StopCard from '../components/trip/StopCard'
import { tripService } from '../services/api'

function ItineraryBuilder() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState(null)
  const [stops, setStops] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTripData = async () => {
      if (!tripId) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const [tripData, stopsData, activitiesData] = await Promise.all([
          tripService.getTripById(tripId),
          tripService.getStops(tripId),
          tripService.getActivitiesForTrip(tripId),
        ])

        if (!tripData) {
          setError('Trip not found.')
          return
        }

        setTrip(tripData)
        setStops(stopsData)
        setActivities(activitiesData)
      } catch (loadError) {
        console.error('Itinerary builder load error', loadError)
        setError('Unable to load itinerary details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadTripData()
  }, [tripId])

  const renderTimeline = () => {
    if (!stops.length) {
      return (
        <div className="rounded-lg bg-slate-50 p-5 text-sm text-slate-500">
          Add your first city to build the itinerary timeline.
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {stops.map((stop, index) => (
          <div key={stop.id || index} className="border-l-2 border-sky-100 pl-4">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-600">
              Stop {index + 1} - {stop.startDate || 'TBD'}
            </p>
            <h3 className="mt-1 font-bold text-slate-950">{stop.city}</h3>
            <p className="mt-1 text-sm text-slate-500">{stop.country || 'Country TBD'}</p>
          </div>
        ))}
      </div>
    )
  }

  const renderActivities = () => {
    if (!activities.length) {
      return (
        <div className="rounded-lg bg-slate-50 p-5 text-sm text-slate-500">
          No activities yet. Add stops to create activities for this trip.
        </div>
      )
    }

    return (
      <div className="grid gap-3">
        {activities.slice(0, 2).map((activity) => (
          <div key={activity.id} className="rounded-lg bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-600">{activity.type || 'Activity'}</p>
            <h3 className="mt-1 font-black text-slate-950">{activity.title || activity.name || 'Untitled activity'}</h3>
            <p className="mt-2 text-sm text-slate-500">{activity.description || 'No description provided.'}</p>
          </div>
        ))}
      </div>
    )
  }

  if (!tripId) {
    return (
      <div className="rounded-lg premium-card p-6">
        <h2 className="text-xl font-black text-slate-950">No trip selected</h2>
        <p className="mt-3 text-slate-500">Create a new trip first, then return here to build the itinerary.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-lg premium-card p-6 text-slate-500">Loading itinerary...</div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg premium-card p-6 text-rose-700">{error}</div>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Builder"
        title={trip?.title || 'Itinerary Builder'}
        description="Arrange stops, add activities, and preview the day-by-day flow."
        action={(
          <>
            <Button icon={Plus}>Add stop</Button>
            <Link to={`/itinerary/${tripId}`}><Button variant="secondary" icon={Share2}>Review itinerary</Button></Link>
          </>
        )}
      />
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        {['Trip shell', 'Stops arranged', 'Activities assigned', 'Share preview'].map((step, index) => (
          <div key={step} className="rounded-lg premium-card p-3">
            <p className="text-xs font-black uppercase text-orange-600">Step {index + 1}</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-black text-slate-900"><CheckCircle2 className="h-4 w-4 text-teal-600" />{step}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <section className="space-y-4">
          {stops.length > 0 ? stops.map((stop, index) => <StopCard key={stop.id || index} stop={stop} index={index} />) : (
            <div className="rounded-lg premium-card p-8 text-center text-slate-600">
              <p className="text-lg font-semibold">No stops added yet.</p>
              <p className="mt-2 text-sm">Add your first city to start building your itinerary.</p>
            </div>
          )}
        </section>
        <section className="rounded-lg premium-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-950">Timeline preview</h2>
            <CalendarPlus className="h-5 w-5 text-teal-600" />
          </div>
          <div className="mt-5">
            {renderTimeline()}
          </div>
          <div className="mt-6">
            {renderActivities()}
          </div>
        </section>
      </div>
    </>
  )
}

export default ItineraryBuilder
