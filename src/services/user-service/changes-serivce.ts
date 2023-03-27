import { ApiError } from "../../exception/ApiEroor"
import { User } from "../../models/user-model/userModel"
import bcrypt from 'bcrypt'

class ChangesService {
    async changeLogin(id: number, login: string) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw ApiError.NotFound('User not found')
        }
        if (user.login === login) {
            throw ApiError.BadRequest('Change the name')
        }
              
        user.login = login
        await user.save()
        return user.login
    }    

    async changePassword(id: number, password: string) {
        const user = await User.findOne({ where: { id } })
        if (!user) {
            throw ApiError.NotFound('User not found')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        user.password = hashPassword
        await user.save()
    }
}


export const changesService = new ChangesService()