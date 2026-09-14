import apiClient from "./apiClient"

export async function getAllLocation() {
    const response = await apiClient.get('/locations')
    return response.data
}