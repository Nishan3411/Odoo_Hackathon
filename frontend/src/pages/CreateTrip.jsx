import { Calendar, MapPinned, Users } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import PageHeader from '../components/common/PageHeader'

function CreateTrip() {
  return (
    <>
      <PageHeader
        eyebrow="Trip setup"
        title="Create Trip"
        description="Start with the essentials. Backend integration can later submit this payload through the API service."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <form className="rounded-lg border border-slate-200 bg-white p-5 travel-card-shadow">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Trip name" icon={MapPinned} placeholder="Mediterranean Loop" />
            <Input label="Travel dates" icon={Calendar} placeholder="Jun 12 - Jun 24, 2026" />
            <Input label="Starting city" placeholder="Barcelona" />
            <Input label="Travelers" icon={Users} placeholder="4" />
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Trip notes</span>
            <textarea
              rows="7"
              className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Goals, constraints, visa notes, must-see places..."
            />
          </label>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button>Save trip</Button>
            <Button variant="secondary">Save as draft</Button>
          </div>
        </form>
        <aside className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white">
          <h2 className="text-xl font-bold">Smart planning checklist</h2>
          <div className="mt-5 space-y-3">
            {['Add at least two cities', 'Estimate major costs', 'Choose a share setting', 'Prepare packing categories'].map((item) => (
              <div key={item} className="rounded-lg bg-white/10 p-3 text-sm text-slate-100">{item}</div>
            ))}
          </div>
        </aside>
      </div>
    </>
  )
}

export default CreateTrip
