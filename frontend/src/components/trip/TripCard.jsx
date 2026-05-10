import { Link } from 'react-router-dom'
import { CalendarDays, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { currency } from '../../utils/formatters'

function TripCard({ trip }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-lg premium-card"
    >
      <div className="relative h-44">
        <img src={trip.image} alt={trip.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent opacity-70" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-orange-600 shadow-sm">
          {trip.status}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-slate-950">{trip.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{trip.cities.join(' -> ')}</p>
          </div>
          <p className="text-sm font-bold text-teal-600">{currency(trip.budget)}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {trip.dates}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {trip.collaborators}
          </span>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">
            <span>Plan completion</span>
            <span>{trip.completion}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-teal-500" style={{ width: `${trip.completion}%` }} />
          </div>
        </div>
        <Link
          to={`/itinerary/${trip.id}`}
          className="mt-4 inline-flex items-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          Open itinerary
        </Link>
      </div>
    </motion.article>
  )
}

export default TripCard
