import apiClient from './apiClient'

export async function getAllArticles() {
  const response = await apiClient.get('/knowledge-base')
  return response.data
}

export async function getArticleById(id) {
  const response = await apiClient.get(`/knowledge-base/${id}`)
  return response.data
}