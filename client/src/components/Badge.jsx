const colorMap = {
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Waiting: 'bg-purple-100 text-purple-700',
  Resolved: 'bg-green-100 text-green-700',
  Closed: 'bg-gray-200 text-gray-700',
  Low: 'bg-gray-100 text-gray-600',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-orange-100 text-orange-700',
  Critical: 'bg-red-100 text-red-700',
  Admin: 'bg-red-100 text-red-700',
  'IT Technician': 'bg-blue-100 text-blue-700',
  Employee: 'bg-gray-100 text-gray-600',
}

function Badge({ children }) {
  const classes = colorMap[children] || 'bg-gray-100 text-gray-600'
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${classes}`}>
      {children}
    </span>
  )
}

export default Badge