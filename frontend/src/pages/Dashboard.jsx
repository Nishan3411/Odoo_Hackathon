import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, CheckCircle2, MapPinned, Plane, Plus, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import BudgetChart from '../components/trip/BudgetChart'
import TripCard from '../components/trip/TripCard'
import { activities, getCurrentUser } from '../data/mockData'
import { currency } from '../utils/formatters'
import { tripService } from '../services/api'

function Dashboard() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [builderTripId, setBuilderTripId] = useState('')

  useEffect(() => {
    const loadTrips = async () => {
      setLoading(true)
      try {
        const tripsData = await tripService.getTrips()
        setTrips(tripsData)
        const storedTripId = localStorage.getItem('selectedTripId')
        if (storedTripId) {
          setBuilderTripId(storedTripId)
        } else if (tripsData?.length > 0) {
          setBuilderTripId(tripsData[0].id)
        }
      } catch (loadError) {
        console.error('Dashboard trips load error', loadError)
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  const stats = [
    { label: 'Upcoming trips', value: trips.length, icon: MapPinned, tone: 'bg-sky-50 text-sky-700' },
    { label: 'Planned cities', value: '9', icon: CalendarDays, tone: 'bg-teal-50 text-teal-700' },
    { label: 'Estimated spend', value: currency(10355), icon: WalletCards, tone: 'bg-orange-50 text-orange-700' },
  ]

  const builderLink = builderTripId ? `/builder/${builderTripId}` : '/create-trip'
  const user = getCurrentUser()

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        eyebrow="Command center"
        title={`Good morning, ${user.name}`}
        description="Your trips, budgets, itinerary gaps, and travel checklist are ready for a quick planning pass."
        action={<Link to="/create-trip"><Button icon={Plus}>Create trip</Button></Link>}
      />
      <section className="mb-6 overflow-hidden rounded-lg luxury-panel text-white soft-ring">
        <div className="grid gap-6 p-5 md:grid-cols-[1fr_0.75fr] md:p-6">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-orange-200">Next best action</p>
            <h2 className="mt-2 text-3xl font-black">Finish the Golden Triangle plan before booking windows close.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">Review rail timing, lock Jaipur stays, and publish a polished share link for your travel group.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to={builderLink}><Button variant="accent" icon={Plane}>Continue builder</Button></Link>
              <Link to="/public/golden-triangle"><Button variant="secondary" icon={ArrowRight}>Preview share page</Button></Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {['Route ready', 'Budget synced', 'Packing 60%'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 p-3 text-sm font-bold backdrop-blur">
                <CheckCircle2 className="h-4 w-4 text-teal-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article key={stat.label} className="rounded-lg premium-card p-5">
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
            <h2 className="text-xl font-black text-slate-950">Active trips</h2>
            <Link className="inline-flex items-center gap-1 text-sm font-bold text-sky-700" to="/my-trips">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {loading ? (
              <div className="col-span-2 rounded-lg premium-card p-6 text-slate-500">Loading trips...</div>
            ) : trips.length > 0 ? (
              trips.slice(0, 2).map((trip) => <TripCard key={trip.id} trip={trip} />)
            ) : (
              <div className="col-span-2 rounded-lg premium-card p-6 text-slate-500">No trips found. Create one to start building.</div>
            )}
          </div>
        </div>
        <div className="space-y-6">
          <BudgetChart />
          <div className="rounded-lg premium-card p-5">
            <h2 className="text-lg font-black text-slate-950">Suggested activities</h2>
            <div className="mt-4 space-y-3">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-lg bg-gradient-to-r from-slate-50 to-orange-50/50 p-3">
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
