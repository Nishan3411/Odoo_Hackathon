import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageHeader from '../components/common/PageHeader'
import BudgetChart from '../components/trip/BudgetChart'
import { budgetBreakdown, budgetTimeline } from '../data/mockData'
import { currency } from '../utils/formatters'

function Budget() {
  const shortRupees = (value) => `₹${Math.round(value / 1000)}k`

  return (
    <>
      <PageHeader eyebrow="Money" title="Budget" description="Track total spend, compare planned and actuals, and keep trip costs visible." />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <BudgetChart />
        <section className="rounded-lg border border-slate-200 bg-white p-5 travel-card-shadow">
          <h2 className="text-lg font-bold text-slate-950">Planned vs actual</h2>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={budgetTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={shortRupees} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => currency(value)} />
                <Line type="monotone" dataKey="planned" stroke="#0284c7" strokeWidth={3} />
                <Line type="monotone" dataKey="actual" stroke="#14b8a6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-bold text-slate-950">Category comparison</h2>
        <div className="mt-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={shortRupees} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => currency(value)} />
              <Bar dataKey="value" fill="#f97360" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  )
}

export default Budget
