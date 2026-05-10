import { Mail, MapPin, UserRound } from 'lucide-react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import PageHeader from '../components/common/PageHeader'
import { user } from '../data/mockData'

function Profile() {
  return (
    <>
      <PageHeader eyebrow="Account" title="Profile" description="Personal details and trip planning preferences." />
      <section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-5 text-center travel-card-shadow">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl bg-teal-100 text-3xl font-black text-teal-700">{user.avatar}</div>
          <h2 className="mt-4 text-xl font-bold text-slate-950">{user.name}</h2>
          <p className="text-sm text-slate-500">{user.role}</p>
          <p className="mt-4 rounded-full bg-sky-50 px-3 py-2 text-sm font-bold text-sky-700">{user.plan}</p>
        </aside>
        <form className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Name" icon={UserRound} defaultValue={user.name} />
            <Input label="Email" icon={Mail} defaultValue={user.email} />
            <Input label="Home city" icon={MapPin} defaultValue={user.homeCity} />
            <Input label="Role" defaultValue={user.role} />
          </div>
          <div className="mt-5">
            <Button>Update profile</Button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Profile
