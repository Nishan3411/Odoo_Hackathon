import { Activity, UsersRound } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import { adminMetrics, trips } from '../data/mockData'
import { currency } from '../utils/formatters'

function AdminDashboard() {
  return (
    <>
      <PageHeader eyebrow="Admin" title="Admin Dashboard" description="Operational snapshot for a Traveloop hackathon demo." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <article key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 travel-card-shadow">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-sky-50 text-sky-700">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-teal-600">{metric.change}</span>
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-500">{metric.label}</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{metric.value}</p>
            </article>
          )
        })}
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-950">Recent trips</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-3">Trip</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Completion</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id} className="border-t border-slate-100">
                    <td className="py-4 font-semibold text-slate-900">{trip.title}</td>
                    <td><span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">{trip.status}</span></td>
                    <td className="text-slate-600">{currency(trip.budget)}</td>
                    <td className="text-slate-600">{trip.completion}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
          <Activity className="h-6 w-6 text-orange-400" />
          <h2 className="mt-4 text-xl font-bold">System health</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Mock API adapter, routing, charts, and frontend-only demo flows are ready.</p>
          <div className="mt-5 flex items-center gap-3 rounded-lg bg-white/10 p-4">
            <UsersRound className="h-5 w-5 text-teal-300" />
            <span className="text-sm font-semibold">15 demo users active today</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminDashboard
