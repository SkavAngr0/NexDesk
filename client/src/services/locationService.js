import apiClient from './apiClient'

export async function getAllLocations() {
  const response = await apiClient.get('/locations')
  return response.data
}