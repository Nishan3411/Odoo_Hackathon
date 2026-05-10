import { Search } from 'lucide-react'
import Input from '../components/common/Input'
import PageHeader from '../components/common/PageHeader'
import { cities } from '../data/mockData'

function CitySearch() {
  return (
    <>
      <PageHeader eyebrow="Discovery" title="City Search" description="Browse destination ideas with travel style, budget signal, and visual context." />
      <Input icon={Search} placeholder="Search by city, country, or travel vibe" />
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cities.map((city) => (
          <article key={city.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
            <img src={city.image} alt={city.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{city.name}</h2>
                  <p className="text-sm text-slate-500">{city.country}</p>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{city.priceIndex}</span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">{city.bestFor}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {city.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default CitySearch
