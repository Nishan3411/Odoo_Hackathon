import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, CheckCircle2, MapPinned, Plane, Search, ShieldCheck, Sparkles, Star, WalletCards } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import { cities, trips } from '../data/mockData'
import { currency } from '../utils/formatters'

const trustStats = [
  { label: 'Indian cities mapped', value: '128+' },
  { label: 'Avg. plan time saved', value: '6 hrs' },
  { label: 'Demo itineraries', value: '1.2k' },
]

const bookingSteps = [
  { title: 'Choose your route', text: 'Search city pairs, stays, activities, and local transfer ideas in one flow.', icon: Search },
  { title: 'Shape every day', text: 'Plan stops with calendars, activities, budgets, notes, and packing tasks.', icon: CalendarDays },
  { title: 'Share beautifully', text: 'Publish a polished itinerary for friends, family, or hackathon judges.', icon: ShieldCheck },
]

function Landing() {
  const featuredTrip = trips[0]

  return (
    <main className="min-h-screen bg-[#fff8f0] text-slate-950">
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=85"
          alt="Taj Mahal at sunrise"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/10" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <Link to="/" className="flex items-center gap-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-orange-500 via-teal-500 to-sky-600 text-xl font-black shadow-lg shadow-orange-950/30">T</span>
            <div>
              <p className="text-lg font-black">Traveloop</p>
              <p className="text-xs font-semibold text-orange-100">India trips, beautifully planned</p>
            </div>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-semibold text-white/80 md:flex">
            <a href="#destinations" className="hover:text-white">Destinations</a>
            <a href="#planner" className="hover:text-white">Planner</a>
            <a href="#trust" className="hover:text-white">Why Traveloop</a>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-white/10 sm:inline-flex">
              Login
            </Link>
            <Link to="/signup">
              <Button variant="accent" className="shadow-orange-950/30">Sign up</Button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid min-h-[calc(92vh-5.25rem)] max-w-7xl items-center gap-8 px-4 pb-16 pt-8 md:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-orange-100 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Premium itinerary booking workspace
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] text-white md:text-7xl">
              Book-worthy India trips before you book a thing.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              Build routes across forts, beaches, backwaters, ghats, cafes, and mountain towns with budgets, calendars, activities, packing, notes, and public itinerary sharing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button variant="accent" icon={Plane} className="min-w-44">Start planning</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary" icon={ArrowRight} className="border-white/30 bg-white/95">View demo</Button>
              </Link>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {trustStats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/15 bg-white/10 p-3 text-white backdrop-blur">
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-lg border border-white/20 bg-white/95 p-4 shadow-2xl shadow-slate-950/30"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img src={featuredTrip.image} alt={featuredTrip.title} className="h-52 w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-orange-600">Featured route</div>
            </div>
            <div className="p-2 pt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-black text-slate-950">{featuredTrip.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{featuredTrip.cities.join(' -> ')}</p>
                </div>
                <span className="rounded-lg bg-teal-50 px-3 py-2 text-sm font-black text-teal-700">{currency(featuredTrip.budget)}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['Dates', featuredTrip.dates, CalendarDays],
                  ['Stops', `${featuredTrip.cities.length} cities`, MapPinned],
                  ['Ready', `${featuredTrip.completion}%`, CheckCircle2],
                ].map(([label, value, Icon]) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-3">
                    <Icon className="h-4 w-4 text-sky-600" />
                    <p className="mt-3 text-xs font-bold uppercase text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-slate-950 p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Smart booking score</span>
                  <span className="inline-flex items-center gap-1 text-sm font-black text-orange-300">
                    <Star className="h-4 w-4 fill-orange-300" /> 4.9
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-[86%] rounded-full bg-gradient-to-r from-orange-400 via-teal-400 to-sky-400" />
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="destinations" className="-mt-10 px-4 pb-12 md:px-6">
        <div className="mx-auto max-w-7xl rounded-lg border border-orange-100 bg-white p-4 shadow-xl shadow-orange-100/60">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_0.8fr_auto]">
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase text-slate-400">Where to?</p>
              <p className="mt-1 font-black text-slate-950">Delhi, Agra, Jaipur</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase text-slate-400">Travel style</p>
              <p className="mt-1 font-black text-slate-950">Heritage + food + stays</p>
            </div>
            <div className="rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase text-slate-400">Budget</p>
              <p className="mt-1 font-black text-slate-950">Rs 75k - 1.2L</p>
            </div>
            <Link to="/cities" className="inline-flex">
              <Button icon={Search} className="h-full w-full">Explore</Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="planner" className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-orange-600">Designed for decisions</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">A booking-grade planner, not a notes dump.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">Traveloop keeps the messy parts of Indian travel planning visible: city hops, train timing, local activities, budget drift, packing, and shareable public plans.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {bookingSteps.map((step) => {
            const Icon = step.icon
            return (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:border-orange-200">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-orange-50 text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{step.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section id="trust" className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-slate-950 p-6 text-white">
            <WalletCards className="h-7 w-7 text-orange-300" />
            <h2 className="mt-5 text-3xl font-black">Rupee-aware by default.</h2>
            <p className="mt-4 leading-7 text-slate-300">Every demo budget, activity, and admin view uses Indian trip assumptions so the product feels local from the first click.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {cities.map((city) => (
              <article key={city.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                <img src={city.image} alt={city.name} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-slate-950">{city.name}</h3>
                      <p className="text-sm text-slate-500">{city.country}</p>
                    </div>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">{city.priceIndex}</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-600">{city.bestFor}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
