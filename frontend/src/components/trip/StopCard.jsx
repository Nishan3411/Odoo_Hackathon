import { BedDouble, Plane } from 'lucide-react'

function StopCard({ stop, index }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 transition hover:border-sky-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-sky-50 text-sm font-bold text-sky-700">
          {index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-slate-950">{stop.city}</h3>
            <p className="text-sm font-semibold text-teal-600">{stop.dates}</p>
          </div>
          <div className="mt-3 grid gap-2 text-sm text-slate-500 sm:grid-cols-2">
            <span className="inline-flex items-center gap-2">
              <BedDouble className="h-4 w-4 text-slate-400" />
              {stop.stay}
            </span>
            <span className="inline-flex items-center gap-2">
              <Plane className="h-4 w-4 text-slate-400" />
              {stop.transport}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {stop.highlights.map((highlight) => (
              <span key={highlight} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default StopCard
