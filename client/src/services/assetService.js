import apiClient from './apiClient'

export async function getAllAssets() {
  const response = await apiClient.get('/assets')
  return response.data
}

export async function createAsset(assetData) {
  const response = await apiClient.post('/assets', assetData)
  return response.data
}

export async function updateAsset(assetTag, assetData) {
  const response = await apiClient.put(`/assets/${assetTag}`, assetData)
  return response.data
}

export async function deleteAsset(assetTag) {
  const response = await apiClient.delete(`/assets/${assetTag}`)
  return response.data
}