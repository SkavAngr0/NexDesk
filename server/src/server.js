import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import assetRoutes from './routes/assetRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'NexDesk API is running' })
})

app.use('/api/assets', assetRoutes)
app.use('/api/tickets', ticketRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`NexDesk API running on http://localhost:${PORT}`)
})