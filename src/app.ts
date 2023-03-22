import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import router from './routes/routes'
import { middlewareError } from './middlewares/middleware-error'
import fileupload from 'express-fileupload'
import swagerUI from 'swagger-ui-express'
import swagger from './swager.json'
import path from 'path'
const model = require('./models')

const app: express.Application = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(fileupload({ createParentPath: true }))
app.use(express.json())

// Getting files from the "static" folder
app.use('/image', express.static(path.resolve(__dirname, 'static/img')))
app.use('/video', express.static(path.resolve(__dirname, 'static/video')))

app.use('/api', router)


app.use('/api-docs', swagerUI.serve, swagerUI.setup(swagger))


app.use(middlewareError)

export default app