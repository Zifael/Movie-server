import { NextFunction, Request, Response } from "express";
import { getAdimn, ISetLogin } from "../models/user-model/types";
import { userService } from "../services/user-service";
import { TypeRequestBody, TypeRequestParams } from "../types";
import { IReqCookie } from "../types/type-token";
import { IChangePassword, IUser, TypeResetPassword } from "../types/type-user";


class UserController {
    async create(req: TypeRequestBody<IUser>, res: Response, next: NextFunction) {
        try {
            const { email, login, password } = req.body
            const data = await userService.create(email, login, password)
            res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async activate(req: TypeRequestParams<{ link: string }>, res: Response, next: NextFunction) {
        try {
            const { link } = req.params                    
            await userService.active(link)
            res.redirect(process.env.CLIENT_URL as string)
        } catch (error) {
            next(error)
        }
    }

    async login(req: TypeRequestBody<IUser>, res: Response, next: NextFunction) {
        try {            
            const { login, password } = req.body            
            const data = await userService.login(login, password)
            res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async logout(req: IReqCookie, res: Response, next: NextFunction) {        
        try {            
            const { refreshToken } = req.cookies             
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({ message: 'exit completed successfully' })
        } catch (error) {
            next(error)
        }
    }

    async refresh(req: IReqCookie, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies                      
            const data = await userService.refresh(refreshToken)
            res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    

    async checkPassword(req: TypeRequestBody<IChangePassword>, res: Response, next: NextFunction) {
        try {
            const { id, password } = req.body
            const result = await userService.checkPassword(id, password)
            res.json({ result })
        } catch (error) {
            next(error)
        }
    }

    async changeLogin(req: TypeRequestBody<ISetLogin>, res: Response, next: NextFunction) {
        try {
            const { id, login } = req.body
            const newLogin = await userService.changeLogin(id, login)
            res.json({ message: 'change completed successfully', login: newLogin })
        } catch (error) {
            next(error)
        }
    }  

    async changePassword(req: TypeRequestBody<IChangePassword>, res: Response, next: NextFunction) {
        try {
            const { id, password } = req.body
            await userService.changePassword(id, password)
            res.json({ message: 'Password changed successfully' })
        } catch (error) {
            next(error)
        }
    }   

    async sendMessageResetPassword(req: TypeRequestBody<{ email: string }>, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            await userService.sendMessageResetPassword(email)
            res.json({ message: 'The message has been sent' })
        } catch (error) {
            next(error)
        }
    }

    async resetPassword(req: TypeResetPassword, res: Response, next: NextFunction) {
        try {
            const { code } = req.query
            const { password } = req.body
            console.log(code, password)
            await userService.resetPassword(code, password)
            res.json({ message: 'reset'})
        } catch (error) {
            next(error)
        }
    }

    async getAdimn(req: TypeRequestBody<getAdimn>, res: Response, next: NextFunction) {
        try {
            const { userId, key } = req.body
            await userService.getAdmin(userId, key)
            res.json({ message: 'Admin role received'})
        } catch (error) {
            next(error)
        }
    }

}

export const userController = new UserController()