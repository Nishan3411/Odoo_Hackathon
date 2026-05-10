import { Star } from 'lucide-react'
import { currency } from '../../utils/formatters'

function ActivityCard({ activity }) {
  const Icon = activity.icon

  return (
    <article className="rounded-lg premium-card p-4 transition hover:-translate-y-1">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-teal-50 to-orange-50 text-teal-700">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-sky-600">{activity.category}</p>
              <h3 className="mt-1 font-black text-slate-950">{activity.name}</h3>
            </div>
            <span className="shrink-0 text-sm font-bold text-slate-950">{currency(activity.cost)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
            <span>{activity.city} - {activity.duration}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-orange-600">
              <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
              {activity.rating}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ActivityCard
