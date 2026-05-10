import { Bell, Menu, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../common/Button'
import Input from '../common/Input'
import { user } from '../../data/mockData'

function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-sky-50 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-orange-500 via-teal-500 to-sky-600 font-bold text-white">T</span>
          <span className="text-lg font-bold text-slate-950">Traveloop</span>
        </Link>
        <div className="hidden max-w-md flex-1 md:block">
          <Input icon={Search} placeholder="Search trips, cities, activities" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button icon={Plus} className="hidden sm:inline-flex">
            New trip
          </Button>
          <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700">
            <Bell className="h-4 w-4" />
          </button>
          <Link to="/profile" className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1.5 pr-3">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-teal-100 text-sm font-bold text-teal-700">
              {user.avatar}
            </span>
            <span className="hidden text-sm font-semibold text-slate-700 sm:block">{user.name}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
