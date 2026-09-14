import { Router } from 'express'
import { getAllLocations } from '../controllers/locationController.js'

const router = Router()

router.get('/', getAllLocations)

export default router