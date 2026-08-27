function StatCard({ label, value, icon: Icon, accent = 'text-blue-600' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      {Icon && (
        <div className={`p-3 rounded-lg bg-gray-100 ${accent}`}>
          <Icon size={22} />
        </div>
      )}
    </div>
  )
}

export default StatCard