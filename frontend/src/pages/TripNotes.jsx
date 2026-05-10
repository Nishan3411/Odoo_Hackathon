import { Plus } from 'lucide-react'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import { notes } from '../data/mockData'

function TripNotes() {
  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Trip Notes"
        description="Capture planning decisions, reservations, and ideas before they scatter."
        action={<Button icon={Plus}>New note</Button>}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {notes.map((note) => (
          <article key={note.id} className="rounded-lg premium-card p-5 transition hover:-translate-y-1">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-600">{note.updated}</p>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{note.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{note.body}</p>
          </article>
        ))}
        <article className="rounded-lg border border-dashed border-orange-300 bg-orange-50/60 p-5">
          <h2 className="text-lg font-black text-slate-950">Quick note</h2>
          <textarea className="mt-3 min-h-40 w-full rounded-lg border border-orange-100 bg-white p-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100" placeholder="Write a new note..." />
        </article>
      </div>
    </>
  )
}

export default TripNotes
