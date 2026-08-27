import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Laptop,
    Ticket,
    BookOpen,
    Users,
    MapPin,
} from 'lucide-react'

const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/assets', label: 'Assets', icon: Laptop },
    { to: '/tickets', label: 'Tickets', icon: Ticket },
    { to: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    { to: '/users', label: 'Users', icon: Users },
    { to: '/locations', label: 'Locations', icon: MapPin },
]

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <div className="px-6 py-5 text-xl font-bold text-white border-b border-gray-800">
        NexDesk
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
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