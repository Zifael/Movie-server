import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import router from './routes/routes'
import { middlewareError } from './middlewares/middleware-error'
const model = require('./models')

const app: express.Application = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api', router)

app.use(middlewareError)

export default app