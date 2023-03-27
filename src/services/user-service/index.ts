import { ApiError } from "../../exception/ApiEroor"
import { Role, User } from "../../models/user-model/userModel"
import bcrypt from 'bcrypt'
import { UserDto } from "../../Dto/userDto"
import { tokenService } from "./token-service"
import { mailService } from "../mail-service"
import { v4 as uuidv4 } from 'uuid'

class UserService {

    async createTokenAndSaveDB(user: User) {
        const rolesDB = await user.getRoles()
        const roles = rolesDB.map(e => e.dataValues.value)        
        const userDto = new UserDto(user.email, user.login, roles)
        const tokens = tokenService.createTokens({ ...userDto })
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {
            tokens: {
                ...tokens
            },
            user: userDto           
        }
    }

    async create(email: string, login: string, password: string) {
        const user = await User.findOne({ where: { email } })        
        if (user) {
            throw ApiError.BadRequest('A user with this email address already exists')
        }
        const hashPassword = await bcrypt.hash(password, 5)        
        
        let roleDB = await Role.findOne({ where: { value: 'User' } })

        // activateLink
        const activateLink = uuidv4() + 'link'

        // if there is no "user" role in the database, create it
        if (!roleDB) {
            roleDB = await Role.create({ value: 'User' })
        }
        
        const createUser = await User.create({email, login, password: hashPassword, activateLink})
        await createUser.addRoles([roleDB])  
        // Sending a message to the mail
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activateLink}`)      
       
        return this.createTokenAndSaveDB(createUser)
    }

    async active(activateLink: string) {
        const user = await User.findOne({ where: { activateLink } })
        if (!user) {
            throw ApiError.NotFound('User not found')
        }
        user.isActivate = true
        await user.save()
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const hashPassword = await bcrypt.compare(password, user.password)
        if (!hashPassword) {
            throw ApiError.BadRequest('Неверный пароль')
        }      

        return this.createTokenAndSaveDB(user)
    }

    async logout(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken: string) {      
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        } 
        const userData = tokenService.validateRefreshToken(refreshToken)
        // find token in db
        const findToken = await tokenService.findToken(refreshToken)
        // If the Refreshtoken is not found in the database and the validation fails,  returns an error
        if (!userData || !findToken) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({ where: { email: userData.email } })  
        await tokenService.removeToken(refreshToken)      
        return this.createTokenAndSaveDB(user!)
    }

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
}

export const userService = new UserService()