import apiClient from "./apiClient"

export async function getAllUsers() {
    const response = await apiClient.get('/users')
    return response.data
}