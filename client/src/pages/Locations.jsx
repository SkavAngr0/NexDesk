import { useState, useEffect } from 'react'
import { MapPin, Laptop, Ticket } from 'lucide-react'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import { getAllLocations } from '../services/locationService'

function Locations() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadLocations()
  }, [])

  async function loadLocations() {
    try {
      setLoading(true)
      const data = await getAllLocations()
      setLocations(data)
      setError(null)
    } catch (err) {
      setError('Failed to load locations. Is the backend server running?')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadLocations} />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Locations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 min-w-0">
            <div className="flex items-center gap-2 text-gray-900 font-semibold mb-1 min-w-0">
              <MapPin size={18} className="text-blue-600 shrink-0" />
              <span className="truncate">{location.name}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4 truncate">{location.country}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Laptop size={16} className="shrink-0" />
                {location._count.assets} assets
              </span>
              <span className="flex items-center gap-1.5">
                <Ticket size={16} className="shrink-0" />
                {location._count.tickets} tickets
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Locations