import { NextFunction, Response } from "express";
import { ApiError } from "../exception/ApiEroor";
import { tokenService } from "../services/user-service/token-service";
import { ReqHeader } from "../types";

export const authMiddleware = (req: ReqHeader, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.accesstoken as string
        
        if (!authorizationHeader) {
            throw ApiError.UnauthorizedError()
        }
        // Separating the bearer from the token
        const accessToken = authorizationHeader.split(' ')[1]       
        if (!accessToken) {
            throw ApiError.UnauthorizedError()
        }        
        const data = tokenService.validateAccessToken(accessToken)         
        if (!data) {
            throw ApiError.UnauthorizedError()
        }        
        next()
    } catch (error) {
        next(error)
    }
}