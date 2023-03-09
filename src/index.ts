import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { sequelize } from './database'
import {model} from './models/index'
import cors from 'cors'
import router from './routes/routes'




const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))



app.use('/api', router)


if (process.env.NODE_ENV === 'development') {
    const start = async () => {
        try {        
            await sequelize.authenticate()
            await sequelize.sync({force: true})   
           
            app.listen(PORT, () => console.log(`server start on port ${PORT}`))        
        } catch (error) {
            console.log(`an eror has occurred - ${error}`)
        }
    }
    start()
}



export default app