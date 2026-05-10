import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { budgetBreakdown } from '../../data/mockData'
import { currency } from '../../utils/formatters'

function BudgetChart({ data = budgetBreakdown }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 travel-card-shadow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Budget split</h2>
          <p className="text-sm text-slate-500">Estimated total {currency(total)}</p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">Live mock</span>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={62} outerRadius={92} paddingAngle={3} dataKey="value">
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => currency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
            <span className="inline-flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
            <span className="font-bold text-slate-950">{currency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetChart
