import { assets } from './mockAssets'

export const locationNames = ['Dammam', 'Khobar', 'Jubail', 'Riyadh']

export const locations = locationNames.map((name) => ({
  name,
  assetCount: assets.filter((a) => a.location === name).length,
}))