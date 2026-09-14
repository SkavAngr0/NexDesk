import apiClient from "./apiClient"

export async function getDashboardStats() {
    const response = await apiClient.get('/dashboard')
    return response.data
}