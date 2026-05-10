import { Mail, MapPin, LogOut, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import PageHeader from '../components/common/PageHeader'
import { getCurrentUser } from '../data/mockData'

function Profile() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Personal details and trip planning preferences."
        action={
          <Button variant="secondary" icon={LogOut} onClick={handleSignOut}>
            Sign out
          </Button>
        }
      />
      <section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-3xl luxury-panel p-6 text-center text-white soft-ring">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-white text-3xl font-black text-orange-600 shadow-xl shadow-orange-200/40">
            {user.avatar}
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-tight text-white">{user.name}</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-300/90">{user.role}</p>
          <p className="mx-auto mt-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-orange-100 shadow-inner shadow-white/10">
            {user.plan}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 px-4 py-3 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Trips</p>
              <p className="mt-2 text-xl font-black text-white">{user.trips}</p>
            </div>
            <div className="rounded-3xl bg-white/10 px-4 py-3 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Saved cities</p>
              <p className="mt-2 text-xl font-black text-white">{user.savedCities}</p>
            </div>
            <div className="rounded-3xl bg-white/10 px-4 py-3 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Home city</p>
              <p className="mt-2 text-xl font-black text-white">{user.homeCity}</p>
            </div>
          </div>
        </aside>
        <form className="rounded-3xl premium-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Name" icon={UserRound} defaultValue={user.name} />
            <Input label="Email" icon={Mail} defaultValue={user.email} />
            <Input label="Home city" icon={MapPin} defaultValue={user.homeCity} />
            <Input label="Role" defaultValue={user.role} />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button>Update profile</Button>
            <Button variant="secondary" icon={LogOut} onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Profile
