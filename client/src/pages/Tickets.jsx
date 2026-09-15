import { useState, useEffect } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import TicketForm from '../components/TicketForm'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import { getAllTickets, createTicket, updateTicket, deleteTicket } from '../services/ticketService'
import { ticketPriorities, ticketStatuses } from '../data/ticketOptions'

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)

  useEffect(() => {
    loadTickets()
  }, [])

  async function loadTickets() {
    try {
      setLoading(true)
      const data = await getAllTickets()
      setTickets(data)
      setError(null)
    } catch (err) {
      setError('Failed to load tickets. Is the backend server running?')
    } finally {
      setLoading(false)
    }
  }

  function openAddModal() {
    setEditingTicket(null)
    setIsModalOpen(true)
  }

  function openEditModal(ticket) {
    setEditingTicket(ticket)
    setIsModalOpen(true)
  }

  async function handleFormSubmit(formData) {
    try {
      if (editingTicket) {
        await updateTicket(editingTicket.ticketNumber, formData)
      } else {
        await createTicket(formData)
      }
      setIsModalOpen(false)
      loadTickets()
    } catch (err) {
      alert('Failed to save ticket. Please try again.')
    }
  }

  async function handleStatusChange(ticketNumber, newStatus) {
    try {
      await updateTicket(ticketNumber, { status: newStatus })
      loadTickets()
    } catch (err) {
      alert('Failed to update status. Please try again.')
    }
  }

  async function handleDelete(ticketNumber) {
    if (!confirm(`Delete ticket ${ticketNumber}? This cannot be undone.`)) return

    try {
      await deleteTicket(ticketNumber)
      loadTickets()
    } catch (err) {
      alert('Failed to delete ticket. Please try again.')
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter

    return matchesSearch && matchesPriority && matchesStatus
  })

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadTickets} />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          New Ticket
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by title or ticket number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-3 py-2"
        >
          <option value="All">All Priorities</option>
          {ticketPriorities.map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg text-sm px-3 py-2"
        >
          <option value="All">All Statuses</option>
          {ticketStatuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="md:hidden space-y-3">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{ticket.ticketNumber}</span>
              <Badge>{ticket.priority}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">{ticket.title}</p>
            <p className="text-xs text-gray-500 mb-3">Requested by {ticket.requester?.name}</p>
            <p className="text-xs text-gray-500 mb-3">
              Technician: {ticket.technician?.name || 'Unassigned'}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket.ticketNumber, e.target.value)}
                className="text-xs border border-gray-300 rounded-md px-2 py-1"
              >
                {ticketStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <div className="flex items-center gap-3">
                <button onClick={() => openEditModal(ticket)} className="text-blue-600">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(ticket.ticketNumber)} className="text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500 text-sm bg-white rounded-xl border border-gray-200">
            No tickets match your search or filters.
          </div>
        )}
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Ticket #</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Requester</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Technician</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{ticket.ticketNumber}</td>
                <td className="px-4 py-3 text-gray-600">{ticket.title}</td>
                <td className="px-4 py-3 text-gray-600">{ticket.requester?.name}</td>
                <td className="px-4 py-3"><Badge>{ticket.priority}</Badge></td>
                <td className="px-4 py-3">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket.ticketNumber, e.target.value)}
                    className="text-xs border border-gray-300 rounded-md px-2 py-1"
                  >
                    {ticketStatuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-600">{ticket.technician?.name || 'Unassigned'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => openEditModal(ticket)} className="text-gray-400 hover:text-blue-600">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(ticket.ticketNumber)} className="text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <div className="px-4 py-10 text-center text-gray-500 text-sm">
            No tickets match your search or filters.
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTicket ? 'Edit Ticket' : 'New Ticket'}
      >
        <TicketForm
          initialData={editingTicket}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Tickets