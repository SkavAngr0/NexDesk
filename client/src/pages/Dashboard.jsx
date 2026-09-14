import { useState, useEffect } from 'react'
import { Laptop, CheckCircle2, Wrench, PackageCheck, Ticket, TrendingUp } from 'lucide-react'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import { getDashboardStats } from '../services/dashboardService'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      setLoading(true)
      const data = await getDashboardStats()
      setStats(data)
      setError(null)
    } catch (err) {
      setError('Failed to load dashboard data. Is the backend server running?')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadStats} />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Assets" value={stats.totalAssets} icon={Laptop} accent="text-blue-600" />
        <StatCard label="Active Devices" value={stats.activeDevices} icon={CheckCircle2} accent="text-green-600" />
        <StatCard label="Under Repair" value={stats.underRepair} icon={Wrench} accent="text-orange-600" />
        <StatCard label="Available" value={stats.available} icon={PackageCheck} accent="text-purple-600" />
        <StatCard label="Open Tickets" value={stats.openTickets} icon={Ticket} accent="text-red-600" />
        <StatCard label="Resolved This Month" value={stats.resolvedThisMonth} icon={TrendingUp} accent="text-teal-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Support Tickets</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {stats.recentTickets.map((ticket) => (
            <div key={ticket.id} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ticket.ticketNumber} • {ticket.requester.name}</p>
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