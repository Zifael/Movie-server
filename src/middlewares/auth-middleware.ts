import { NextFunction, Response } from "express";
import { ApiError } from "../exception/ApiEroor";
import { tokenService } from "../services/user-service/token-service";
import { ReqHeader } from "../types";

export const authMiddleware = (req: ReqHeader, res: Response, next: NextFunction) => {
    try {        
        
        const authorizationHeader = req.headers.accesstoken as string
        const refreshToken = req.cookies.refreshToken
        
        if (!authorizationHeader) {
            throw ApiError.UnauthorizedError()
        }
        // Separating the bearer from the token
        const accessToken = authorizationHeader.split(' ')[1]       
        if (!accessToken) {
            throw ApiError.UnauthorizedError()
        }        
        
        
        const isAccessTokenValid = tokenService.validateAccessToken(accessToken)   
        const isRefreshTokenValid = tokenService.validateRefreshToken(refreshToken)      
        
        if (!isAccessTokenValid || !isRefreshTokenValid) {            
            throw ApiError.UnauthorizedError()
        }        
        next()
    } catch (error) {
        next(error)
    }
}