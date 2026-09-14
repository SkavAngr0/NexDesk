import apiClient from './apiClient'

export async function getAllTickets() {
  const response = await apiClient.get('/tickets')
  return response.data
}

export async function createTicket(ticketData) {
  const response = await apiClient.post('/tickets', ticketData)
  return response.data
}

export async function updateTicket(ticketNumber, ticketData) {
  const response = await apiClient.put(`/tickets/${ticketNumber}`, ticketData)
  return response.data
}

export async function deleteTicket(ticketNumber) {
  const response = await apiClient.delete(`/tickets/${ticketNumber}`)
  return response.data
}