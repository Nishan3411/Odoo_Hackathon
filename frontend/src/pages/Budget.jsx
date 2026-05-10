import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useEffect, useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import BudgetChart from '../components/trip/BudgetChart'
import { tripService } from '../services/api'
import { currency } from '../utils/formatters'

function Budget() {
  const [budget, setBudget] = useState(null)
  const [breakdown, setBreakdown] = useState([])
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const trips = await tripService.getTrips()
        if (!trips.length) {
          return
        }

        const trip = trips[0]
        const budgetData = await tripService.getBudget(trip.id)
        setBudget(budgetData)

        const duration = Math.max(1, budgetData.tripDuration || 1)
        const totalBudget = parseFloat(budgetData.tripBudget || 0)
        const actual = parseFloat(budgetData.totalCost || 0)
        const activityCost = parseFloat(budgetData.activityCost || 0)

        setBreakdown([
          { name: 'Activities', value: activityCost, color: '#34d399' },
          { name: 'Remaining', value: Math.max(totalBudget - actual, 0), color: '#60a5fa' },
          { name: 'Over budget', value: Math.max(actual - totalBudget, 0), color: '#f97316' }
        ])

        setTimeline(Array.from({ length: duration }, (_, index) => ({
          day: `Day ${index + 1}`,
          planned: totalBudget / duration,
          actual: actual / duration
        })))
      } catch (error) {
        console.error('Failed to load budget', error)
      } finally {
        setLoading(false)
      }
    }

    loadBudget()
  }, [])

  return (
    <>
      <PageHeader eyebrow="Money" title="Budget" description="Track spend and compare your real backend totals against plan." />
      {loading ? (
        <p className="text-sm text-slate-500">Loading budget data...</p>
      ) : !budget ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
          No budget data available. Create a trip and add activities to see backend budget summaries.
        </div>
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <BudgetChart data={breakdown} />
            <section className="rounded-lg border border-slate-200 bg-white p-5 travel-card-shadow">
              <h2 className="text-lg font-bold text-slate-950">Planned vs actual</h2>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => currency(value)} />
                    <Line type="monotone" dataKey="planned" stroke="#0284c7" strokeWidth={3} />
                    <Line type="monotone" dataKey="actual" stroke="#14b8a6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
          <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-950">Budget summary</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {[
                { label: 'Budget', value: budget.tripBudget },
                { label: 'Actual spend', value: budget.totalCost },
                { label: 'Remaining', value: budget.remainingBudget }
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-black text-slate-950">{currency(item.value || 0)}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Budget
