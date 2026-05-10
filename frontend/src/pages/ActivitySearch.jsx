import { Filter, Search } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import PageHeader from '../components/common/PageHeader'
import ActivityCard from '../components/trip/ActivityCard'
import { activities } from '../data/mockData'

function ActivitySearch() {
  return (
    <>
      <PageHeader
        eyebrow="Activities"
        title="Activity Search"
        description="Find bookable experiences and attach them to a city stop."
        action={<Button variant="secondary" icon={Filter}>Filters</Button>}
      />
      <Input icon={Search} placeholder="Search food, museums, nature, tours" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
      </div>
    </>
  )
}

export default ActivitySearch
