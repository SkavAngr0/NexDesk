import { Router } from 'express'
import {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} from '../controllers/assetController.js'

const router = Router()

router.get('/', getAllAssets)
router.get('/:id', getAssetById)
router.post('/', createAsset)
router.put('/:id', updateAsset)
router.delete('/:id', deleteAsset)

export default router