import { ArrowRight, CalendarDays, MapPinned, Plus, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import BudgetChart from '../components/trip/BudgetChart'
import TripCard from '../components/trip/TripCard'
import { activities, trips } from '../data/mockData'
import { currency } from '../utils/formatters'

function Dashboard() {
  const stats = [
    { label: 'Upcoming trips', value: trips.length, icon: MapPinned, tone: 'bg-sky-50 text-sky-700' },
    { label: 'Planned cities', value: '9', icon: CalendarDays, tone: 'bg-teal-50 text-teal-700' },
    { label: 'Estimated spend', value: currency(10355), icon: WalletCards, tone: 'bg-orange-50 text-orange-700' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        eyebrow="Command center"
        title="Good morning, Aarav"
        description="Your trips, budgets, itinerary gaps, and travel checklist are ready for a quick planning pass."
        action={<Button icon={Plus}>Create trip</Button>}
      />
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5 travel-card-shadow">
              <div className={`grid h-11 w-11 place-items-center rounded-lg ${stat.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{stat.value}</p>
            </article>
          )
        })}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-950">Active trips</h2>
            <Link className="inline-flex items-center gap-1 text-sm font-bold text-sky-700" to="/my-trips">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {trips.slice(0, 2).map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </div>
        <div className="space-y-6">
          <BudgetChart />
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-950">Suggested activities</h2>
            <div className="mt-4 space-y-3">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div>
                    <p className="font-semibold text-slate-800">{activity.name}</p>
                    <p className="text-sm text-slate-500">{activity.city} - {activity.duration}</p>
                  </div>
                  <span className="text-sm font-bold text-teal-700">{currency(activity.cost)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Dashboard
