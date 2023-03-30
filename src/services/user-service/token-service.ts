import { IUserDTO } from "../../types/type-user";
import jwt from 'jsonwebtoken'
import { ITokens, UserIDJwtPayload } from "../../types/type-token";
import { RefreshToken } from "../../models/user-model/userModel";


class TokenService {
    createTokens(user: IUserDTO): ITokens {        
        const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' })
        const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }
    // Save refresh roken in db
    async saveToken(UserId: number, refreshToken: string) {
        const token = await RefreshToken.findOne({ where: { refreshToken } })
        if (token) {
            token.refreshToken = refreshToken
            token.save()
        } else {
            await RefreshToken.create({ UserId, refreshToken })
        }
    }

    async removeToken(refreshToken: string) {
        await RefreshToken.destroy({ where: { refreshToken } })
    }


    async findToken(refreshToken: string) {
        const token = await RefreshToken.findOne({ where: { refreshToken } })        
        return token
    }

    validateAccessToken(accessToken: string){       
        try {            
            const userData = <UserIDJwtPayload>jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)               
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData = <UserIDJwtPayload>jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string)        
            return userData
        } catch (error) {
            return null
        }
    }  
    
}

export const tokenService = new TokenService()