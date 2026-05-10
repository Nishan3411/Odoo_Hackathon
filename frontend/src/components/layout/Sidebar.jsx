import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  Compass,
  FileText,
  LayoutDashboard,
  Map,
  MapPinned,
  Search,
  Shield,
  User,
  WalletCards,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { classNames } from '../../utils/formatters'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/create-trip', label: 'Create Trip', icon: MapPinned },
  { to: '/my-trips', label: 'My Trips', icon: Map },
  { to: '/builder', label: 'Builder', icon: CalendarDays },
  { to: '/cities', label: 'City Search', icon: Search },
  { to: '/activities', label: 'Activities', icon: Compass },
  { to: '/budget', label: 'Budget', icon: WalletCards },
  { to: '/packing', label: 'Packing', icon: CheckSquare },
  { to: '/notes', label: 'Notes', icon: FileText },
  { to: '/public/golden-triangle', label: 'Public View', icon: ClipboardList },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/admin', label: 'Admin', icon: Shield },
]

function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={classNames('fixed inset-0 z-40 bg-slate-950/40 lg:hidden', open ? 'block' : 'hidden')} onClick={onClose} />
      <aside
        className={classNames(
          'fixed inset-y-0 left-0 z-50 w-72 border-r border-orange-100 bg-white transition-transform lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-orange-500 via-teal-500 to-sky-600 text-lg font-black text-white shadow-lg shadow-orange-100">T</span>
            <div>
              <p className="text-lg font-black text-slate-950">Traveloop</p>
              <p className="text-xs font-semibold text-orange-600">India travel planning OS</p>
            </div>
          </NavLink>
          <button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-100 lg:hidden" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="scrollbar-soft h-[calc(100vh-8rem)] overflow-y-auto px-3 py-4">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  classNames(
                    'mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition',
                    isActive ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="m-4 rounded-lg bg-slate-950 p-4 text-white">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          <p className="mt-3 text-sm font-bold">Hackathon demo ready</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">Mock data today, backend-ready services tomorrow.</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
