import { MapPinned, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import Input from '../components/common/Input'
import PageHeader from '../components/common/PageHeader'
import { tripService } from '../services/api'

const placeholderCities = [
  'travel',
  'adventure',
  'budget',
  'culture'
]

function CitySearch() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCities = async () => {
      try {
        const trips = await tripService.getTrips()
        if (trips.length === 0) {
          setCities([])
          return
        }

        const allStops = await Promise.all(trips.map((trip) => tripService.getStops(trip.id)))
        const cityMap = allStops.flat().reduce((map, stop) => {
          const key = stop.city || stop.country || `City-${stop.id}`
          if (!map.has(key)) {
            map.set(key, {
              id: stop.city || stop.country || `city-${stop.id}`,
              name: stop.city || stop.country || 'Unknown',
              country: stop.country || 'Global',
              image: stop.coverImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
              priceIndex: 'Medium',
              bestFor: 'Your current itinerary',
              tags: placeholderCities
            })
          }
          return map
        }, new Map())
        const uniqueCities = Array.from(cityMap.values())

        setCities(uniqueCities)
      } catch (error) {
        console.error('Failed to load city data', error)
      } finally {
        setLoading(false)
      }
    }

    loadCities()
  }, [])

  return (
    <>
      <PageHeader eyebrow="Discovery" title="City Search" description="Browse destination ideas generated from your backend trip data." />
      <section className="mb-6 rounded-lg premium-card p-4">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
          <Input icon={Search} placeholder="Search Jaipur, ghats, backwaters, workations" />
          <div className="booking-field">
            <p className="text-xs font-black uppercase text-slate-400">Region</p>
            <p className="mt-1 font-black text-slate-950">North + South India</p>
          </div>
          <div className="booking-field">
            <p className="text-xs font-black uppercase text-slate-400">Travel mood</p>
            <p className="mt-1 font-black text-slate-950">Heritage, food, nature</p>
          </div>
          <button className="inline-flex min-h-16 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-black text-white hover:bg-orange-600">
            <SlidersHorizontal className="h-4 w-4" />
            Refine
          </button>
        </div>
      </section>
      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading cities...</p>
      ) : cities.length === 0 ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 text-slate-600">No city data available. Add a trip or stop to generate destinations.</div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cities.map((city) => (
            <article key={city.id} className="group overflow-hidden rounded-lg premium-card transition hover:-translate-y-1">
              <div className="relative h-48">
                <img src={city.image} alt={city.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-orange-600"><MapPinned className="h-3.5 w-3.5" />Featured</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-black text-slate-950">{city.name}</h2>
                    <p className="text-sm text-slate-500">{city.country}</p>
                  </div>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{city.priceIndex}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">{city.bestFor}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {city.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}

export default CitySearch
