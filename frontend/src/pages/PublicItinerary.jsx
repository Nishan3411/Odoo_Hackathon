import { CalendarDays, MapPinned, WalletCards } from 'lucide-react'
import { useParams } from 'react-router-dom'
import StopCard from '../components/trip/StopCard'
import { stops, trips } from '../data/mockData'
import { currency } from '../utils/formatters'

function PublicItinerary() {
  const { tripId } = useParams()
  const trip = trips.find((item) => item.id === tripId) || trips[0]

  return (
    <main className="min-h-screen">
      <section className="relative min-h-[520px] overflow-hidden">
        <img src={trip.image} alt={trip.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
        <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-end px-4 pb-10 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-teal-200">Shared Traveloop itinerary</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black md:text-6xl">{trip.title}</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><CalendarDays className="h-4 w-4" />{trip.dates}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><MapPinned className="h-4 w-4" />{trip.cities.length} cities</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><WalletCards className="h-4 w-4" />{currency(trip.budget)}</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 rounded-lg premium-card p-5">
          <p className="text-sm font-black uppercase tracking-wide text-orange-600">Shared route</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">A clean public itinerary for decisions, not clutter.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Dates, stops, hotels, local transfer context, and highlights are ready for your travel group.</p>
        </div>
        <div className="grid gap-4">
          {stops.map((stop, index) => <StopCard key={stop.id} stop={stop} index={index} />)}
        </div>
      </section>
    </main>
  )
}

export default PublicItinerary
