import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import { getAllUsers } from '../services/userService'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      const data = await getAllUsers()
      setUsers(data)
      setError(null)
    } catch (err) {
      setError('Failed to load users. Is the backend server running?')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-10 w-full max-w-md mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadUsers} />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>

      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="md:hidden space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{user.name}</span>
              <Badge>{user.role}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
            <p className="text-xs text-gray-500">{user.jobTitle} • {user.department}</p>
            <p className="text-xs text-gray-400 mt-1">{user.employeeId}</p>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500 text-sm bg-white rounded-xl border border-gray-200">
            No users match your search.
          </div>
        )}
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Employee ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Job Title</th>
              <th className="px-4 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{user.employeeId}</td>
                <td className="px-4 py-3 text-gray-600">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3 text-gray-600">{user.department}</td>
                <td className="px-4 py-3 text-gray-600">{user.jobTitle}</td>
                <td className="px-4 py-3"><Badge>{user.role}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500 text-sm">
            No users match your search.
          </div>
        )}
      </div>
    </div>
  )
}

export default Users