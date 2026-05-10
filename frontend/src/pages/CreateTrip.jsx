import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPinned, Users } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import PageHeader from '../components/common/PageHeader'
import { tripService } from '../services/api'

function CreateTrip() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startingCity: '',
    travelers: '',
    notes: '',
  })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const updateField = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setStatus('')
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!values.title.trim() || !values.startDate || !values.endDate) {
      setError('Please provide a trip name and travel dates.')
      return
    }

    try {
      const payload = {
        title: values.title.trim(),
        description: values.notes.trim(),
        startDate: values.startDate,
        endDate: values.endDate,
      }

      const createdTrip = await tripService.createTrip(payload)

      if (!createdTrip?.id) {
        throw new Error('Unexpected trip response')
      }

      const stored = localStorage.getItem('userCreatedTrips')
      const createdTrips = stored ? JSON.parse(stored) : []
      const newTrip = {
        id: createdTrip.id.toString(),
        title: createdTrip.title,
        status: 'Draft',
        dates: `${createdTrip.startDate} - ${createdTrip.endDate}`,
        image: 'https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=900&q=80',
        cities: [values.startingCity || 'New city'],
        collaborators: values.travelers || 1,
        budget: 0,
        completion: 0,
      }
      localStorage.setItem('userCreatedTrips', JSON.stringify([...createdTrips, newTrip]))
      localStorage.setItem('selectedTripId', createdTrip.id.toString())
      setStatus('Trip created. Redirecting to itinerary builder...')
      navigate(`/builder/${createdTrip.id}`)
    } catch (submitError) {
      console.error('Create trip failed', submitError)
      setError('Unable to create trip. Please try again.')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Trip setup"
        title="Create Trip"
        description="Start with the essentials. Backend integration can later submit this payload through the API service."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_0.75fr]">
        <form className="rounded-lg premium-card p-5" onSubmit={handleSubmit}>
          <div className="mb-5 rounded-lg bg-gradient-to-r from-orange-50 to-sky-50 p-4">
            <p className="text-sm font-black uppercase tracking-wide text-orange-600">Step 1 of 4</p>
            <p className="mt-1 text-sm text-slate-600">Create the trip shell, then move into itinerary building and sharing.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Trip name"
              icon={MapPinned}
              placeholder="Golden Triangle Getaway"
              value={values.title}
              onChange={updateField('title')}
            />
            <Input
              label="Start date"
              icon={Calendar}
              type="date"
              value={values.startDate}
              onChange={updateField('startDate')}
            />
            <Input
              label="End date"
              icon={Calendar}
              type="date"
              value={values.endDate}
              onChange={updateField('endDate')}
            />
            <Input
              label="Starting city"
              placeholder="Delhi"
              value={values.startingCity}
              onChange={updateField('startingCity')}
            />
            <Input
              label="Travelers"
              icon={Users}
              placeholder="4"
              value={values.travelers}
              onChange={updateField('travelers')}
            />
          </div>
          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Trip notes</span>
            <textarea
              rows="7"
              className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              placeholder="Goals, constraints, visa notes, must-see places..."
              value={values.notes}
              onChange={updateField('notes')}
            />
          </label>
          {error ? <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">{error}</p> : null}
          {status ? <p className="mt-4 rounded-lg bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700">{status}</p> : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="submit">Save and build itinerary</Button>
            <Button variant="secondary" type="button">Save as draft</Button>
          </div>
        </form>
        <aside className="rounded-lg luxury-panel p-5 text-white soft-ring">
          <h2 className="text-xl font-black">Smart planning checklist</h2>
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
