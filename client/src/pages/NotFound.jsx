import { Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <SearchX className="text-gray-300 mb-4" size={48} />
      <h1 className="text-xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-sm text-gray-500 mb-6">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFound