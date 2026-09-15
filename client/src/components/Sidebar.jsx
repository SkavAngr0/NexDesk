import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Laptop,
  Ticket,
  BookOpen,
  Users,
  MapPin,
  X,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/assets', label: 'Assets', icon: Laptop },
  { to: '/tickets', label: 'Tickets', icon: Ticket },
  { to: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/locations', label: 'Locations', icon: MapPin },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-200 min-h-screen flex flex-col transform transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
        <span className="text-xl font-bold text-white">NexDesk</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white md:hidden">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar