import { tickets } from '../data/tickets.js'

export function getAllTickets(req, res) {
  res.status(200).json(tickets)
}

export function getTicketById(req, res) {
  const ticket = tickets.find((t) => t.id === req.params.id)

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' })
  }

  res.status(200).json(ticket)
}

export function createTicket(req, res) {
  const { title, description, priority, category } = req.body

  if (!title || !description || !priority || !category) {
    return res.status(400).json({ error: 'Title, description, priority, and category are required' })
  }

  const newTicket = {
    id: `TCK-${1000 + tickets.length + 1}`,
    status: 'Open',
    technician: 'Unassigned',
    createdDate: new Date().toISOString().split('T')[0],
    resolution: '',
    ...req.body,
  }

  tickets.push(newTicket)
  res.status(201).json(newTicket)
}

export function updateTicket(req, res) {
  const index = tickets.findIndex((t) => t.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: 'Ticket not found' })
  }

  tickets[index] = { ...tickets[index], ...req.body }
  res.status(200).json(tickets[index])
}

export function deleteTicket(req, res) {
  const index = tickets.findIndex((t) => t.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: 'Ticket not found' })
  }

  tickets.splice(index, 1)
  res.status(200).json({ message: 'Ticket deleted successfully' })
}