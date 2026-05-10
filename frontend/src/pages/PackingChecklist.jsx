import { CheckCircle2, Circle, Plus } from 'lucide-react'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import { checklist } from '../data/mockData'

function PackingChecklist() {
  const complete = checklist.filter((item) => item.done).length

  return (
    <>
      <PageHeader
        eyebrow="Packing"
        title="Packing Checklist"
        description={`${complete} of ${checklist.length} items are ready for the Golden Triangle Getaway.`}
        action={<Button icon={Plus}>Add item</Button>}
      />
      <section className="mb-6 rounded-lg premium-card p-4">
        <div className="h-3 rounded-full bg-slate-100">
          <div className="h-3 rounded-full bg-gradient-to-r from-orange-500 via-teal-500 to-sky-600" style={{ width: `${(complete / checklist.length) * 100}%` }} />
        </div>
        <p className="mt-3 text-sm font-bold text-slate-600">{Math.round((complete / checklist.length) * 100)}% ready for departure</p>
      </section>
      <section className="rounded-lg premium-card p-5">
        <div className="space-y-3">
          {checklist.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 p-4 transition hover:border-sky-200 hover:bg-sky-50/40">
              {item.done ? <CheckCircle2 className="h-5 w-5 text-teal-600" /> : <Circle className="h-5 w-5 text-slate-300" />}
              <span className={`flex-1 font-semibold ${item.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{item.item}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{item.category}</span>
            </label>
          ))}
        </div>
      </section>
    </>
  )
}

export default PackingChecklist
