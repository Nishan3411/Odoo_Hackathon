import { Share2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import StopCard from '../components/trip/StopCard'
import { stops, trips } from '../data/mockData'

function ItineraryView() {
  const { tripId } = useParams()
  const trip = trips.find((item) => item.id === tripId) || trips[0]

  return (
    <>
      <PageHeader
        eyebrow="Itinerary"
        title={trip.title}
        description={`${trip.dates} across ${trip.cities.join(', ')}.`}
        action={<Button icon={Share2} variant="accent">Share public link</Button>}
      />
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white travel-card-shadow">
        <div className="relative h-72">
          <img src={trip.image} alt={trip.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-200">{trip.status}</p>
            <h2 className="mt-1 text-3xl font-black">{trip.cities.join(' -> ')}</h2>
          </div>
        </div>
        <div className="grid gap-4 p-5">
          {stops.map((stop, index) => <StopCard key={stop.id} stop={stop} index={index} />)}
        </div>
      </section>
    </>
  )
}

export default ItineraryView
