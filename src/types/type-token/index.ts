import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IReqCookie extends Request {
    cookies: {
        refreshToken: string
    }
}

export interface UserIDJwtPayload extends JwtPayload {
    email: string,
    role: string[]
}