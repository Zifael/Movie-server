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
import cookieParser from 'cookie-parser'
import { ApiError } from './exception/ApiEroor'

const model = require('./models')

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(fileupload({ createParentPath: true }))
app.use(express.json())
app.use(cookieParser())

// Getting files from the "static" folder
app.use('/api/image', express.static(path.resolve(__dirname, 'static/img')))
app.use('/api/video', express.static(path.resolve(__dirname, 'static/video')))

app.use('/api', router)


app.use('/api-docs', swagerUI.serve, swagerUI.setup(swagger))


app.use(function(req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
       throw ApiError.NotFound('A request with this URL was not found')
    }  
});

app.use(middlewareError)

export default app