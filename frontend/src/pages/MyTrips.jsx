import { Plus } from 'lucide-react'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import TripCard from '../components/trip/TripCard'
import { trips } from '../data/mockData'

function MyTrips() {
  return (
    <>
      <PageHeader
        eyebrow="Trips"
        title="My Trips"
        description="All draft, booked, and planning-stage itineraries in one place."
        action={<Button icon={Plus}>New trip</Button>}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {trips.map((trip) => <TripCard key={trip.id} trip={trip} />)}
      </div>
    </>
  )
}

export default MyTrips
