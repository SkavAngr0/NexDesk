import { Laptop, CheckCircle2, Wrench, PackageCheck, Ticket, TrendingUp } from 'lucide-react'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import { dashboardStats, recentTickets } from '../data/mockDashboard'

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Assets" value={dashboardStats.totalAssets} icon={Laptop} accent="text-blue-600" />
        <StatCard label="Active Devices" value={dashboardStats.activeDevices} icon={CheckCircle2} accent="text-green-600" />
        <StatCard label="Under Repair" value={dashboardStats.underRepair} icon={Wrench} accent="text-orange-600" />
        <StatCard label="Available" value={dashboardStats.available} icon={PackageCheck} accent="text-purple-600" />
        <StatCard label="Open Tickets" value={dashboardStats.openTickets} icon={Ticket} accent="text-red-600" />
        <StatCard label="Resolved This Month" value={dashboardStats.resolvedThisMonth} icon={TrendingUp} accent="text-teal-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Support Tickets</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentTickets.map((ticket) => (
            <div key={ticket.id} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ticket.id} • {ticket.requester}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{ticket.priority}</Badge>
                <Badge>{ticket.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard