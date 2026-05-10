import { CalendarPlus, Plus } from 'lucide-react'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import ActivityCard from '../components/trip/ActivityCard'
import StopCard from '../components/trip/StopCard'
import { activities, stops, timelineDays } from '../data/mockData'

function ItineraryBuilder() {
  return (
    <>
      <PageHeader
        eyebrow="Builder"
        title="Itinerary Builder"
        description="Arrange stops, add activities, and preview the day-by-day flow."
        action={<Button icon={Plus}>Add stop</Button>}
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <section className="space-y-4">
          {stops.map((stop, index) => <StopCard key={stop.id} stop={stop} index={index} />)}
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">Timeline preview</h2>
            <CalendarPlus className="h-5 w-5 text-teal-600" />
          </div>
          <div className="mt-5 space-y-4">
            {timelineDays.map((day) => {
              const Icon = day.icon
              return (
                <div key={day.day} className="border-l-2 border-sky-100 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-600">{day.day} - {day.date}</p>
                  <h3 className="mt-1 flex items-center gap-2 font-bold text-slate-950">
                    <Icon className="h-4 w-4 text-orange-500" />
                    {day.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{day.items.join(' - ')}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-6 grid gap-3">
            {activities.slice(0, 2).map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
          </div>
        </section>
      </div>
    </>
  )
}

export default ItineraryBuilder
