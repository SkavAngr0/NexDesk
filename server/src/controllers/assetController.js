import { assets } from '../data/assets.js'

export function getAllAssets(req, res) {
  res.status(200).json(assets)
}

export function getAssetById(req, res) {
  const asset = assets.find((a) => a.id === req.params.id)

  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' })
  }

  res.status(200).json(asset)
}

export function createAsset(req, res) {
  const { type, manufacturer, model, serialNumber } = req.body

  if (!type || !serialNumber) {
    return res.status(400).json({ error: 'Asset type and serial number are required' })
  }

  const newAsset = {
    id: `AST-${String(assets.length + 1).padStart(4, '0')}`,
    ...req.body,
  }

  assets.push(newAsset)
  res.status(201).json(newAsset)
}

export function updateAsset(req, res) {
  const index = assets.findIndex((a) => a.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: 'Asset not found' })
  }

  assets[index] = { ...assets[index], ...req.body }
  res.status(200).json(assets[index])
}

export function deleteAsset(req, res) {
  const index = assets.findIndex((a) => a.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: 'Asset not found' })
  }

  assets.splice(index, 1)
  res.status(200).json({ message: 'Asset deleted successfully' })
}