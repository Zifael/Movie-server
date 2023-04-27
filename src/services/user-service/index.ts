import { ApiError } from "../../exception/ApiEroor"
import { Role, User } from "../../models/user-model/userModel"
import bcrypt from 'bcrypt'
import { UserDto } from "../../Dto/userDto"
import { tokenService } from "./token-service"
import { mailService } from "../mail-service"
import { v4 as uuidv4 } from 'uuid'
import { changesService } from "./changes-serivce"
import { FavoriteList } from "../../models/movie-model/movieModel"

class UserService {

    async createTokenAndSaveDB(user: User) {
        const rolesDB = await user.getRoles()
        const roles = rolesDB.map(e => e.dataValues.value)        
        const userDto = new UserDto(user.id, user.email, user.login, roles)        
        const tokens = tokenService.createTokens({ ...userDto })
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {
            tokens: {
                ...tokens
            },
            user: userDto,
            activateLink: user.activateLink           
        }
    }

    async create(email: string, login: string, password: string) {        

        const user = await User.findOne({ where: { email } })   
        const userLogin = await User.findOne({ where: { login } }) 
            
        if (user) {
            throw ApiError.BadRequest('A user with this email address already exists')
        }
        if (userLogin) {
            throw ApiError.BadRequest('A user with this login already exists')
        }

        // activateLink
        const activateLink = uuidv4() + 'link'
        const hashPassword = await bcrypt.hash(password, 5)        
        
        let roleDB = await Role.findOne({ where: { value: 'User' } })    
        // if there is no "user" role in the database, create it
        if (!roleDB) {
            roleDB = await Role.create({ value: 'User' })
        }      
        
        const createUser = await User.create({email, login, password: hashPassword, activateLink})
        await createUser.addRoles([roleDB])        
        // Sending a message to the mail
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activateLink}`)    
        // create a favorites list for the user        
        await FavoriteList.create({ UserId: createUser.id })  
               
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

    async login(login: string, password: string) {
        const user = await User.findOne({ where: { login } })
        if (!user) {
            throw ApiError.BadRequest('A user with this login was not found')
        }
        const hashPassword = await bcrypt.compare(password, user.password)
        if (!hashPassword) {
            throw ApiError.BadRequest('Invalid password')
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
        const data = await changesService.changeLogin(id, login)       
        return data
    }

    async changePassword(id: number, password: string, newPassowrd: string) {
        const user = await User.findOne({ where: { id } })        
        if (!user) {
            throw ApiError.NotFound('User not found')
        }
        const result = await bcrypt.compare(password, user.password)        
        if (!result) {
            throw ApiError.BadRequest('The password is invalid')
        }
        if (password === newPassowrd) {
            throw ApiError.BadRequest("You can't change your previous password")
        }        
        const createNewPassword = await bcrypt.hash(newPassowrd, 5)                
        user.password = createNewPassword
        await user.save()
    }    
 

    async sendMessageResetPassword(email: string) {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw ApiError.NotFound('email not found')
        }
        const resetCode = uuidv4()
        user.resetCode = resetCode
        await user.save()
        mailService.sendResetPasswordMail(user.email, `${process.env.RESET_PASSWORD_URL}?code=${resetCode}`, user.login)
        return resetCode
    }

    async resetPassword(code: string, password: string) {        
        const user = await User.findOne( { where: { resetCode: code } } )
        if (!user) {
            throw ApiError.NotFound('The password reset code is not correct')
        }
        const hashPassword = await bcrypt.hash(password, 5)  
        user.password = hashPassword
        user.resetCode = null
        await user.save()
    }

    async getAdmin(userId: number, key: string) {
        const user = await User.findOne({ where: { id: userId } })        
        if (!user) {
            throw ApiError.NotFound('User not found')
        }
        
        let roleAdmin = await Role.findOne({ where: { value: 'ADMIN' } })
        if (!roleAdmin) {
            roleAdmin = await Role.create({ value: 'ADMIN' })
        }

        if (key !== process.env.GET_ADMIN) {            
            throw ApiError.BadRequest('Invalid key')            
        }
        
        await user.addRoles([roleAdmin])
        
    }
}

export const userService = new UserService()