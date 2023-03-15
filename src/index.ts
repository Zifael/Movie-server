import app from './app'
import { sequelize } from './database'

const PORT = process.env.PORT || 5000

const start = async () => {
    try {  
        await sequelize.authenticate()    
        await sequelize.sync({alter: true})       
        app.listen(PORT, () => console.log(`server start on port ${PORT}`))        
    } catch (error) {
        console.log(`an eror has occurred - ${error}`)
    }
}
start()




