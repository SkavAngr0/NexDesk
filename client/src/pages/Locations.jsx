import { MapPin, Laptop } from 'lucide-react'
import { locations } from '../data/mockLocations'

function Locations() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Locations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((location) => (
          <div
            key={location.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
          >
            <div className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
              <MapPin size={18} className="text-blue-600" />
              {location.name}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Laptop size={16} />
              {location.assetCount} assets
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Locations