import { Response, NextFunction } from "express";
import { ApiError } from "../exception/ApiEroor";
import { TypeRequestBody } from "../types";
import { IUser } from "../types/type-user";


export const validationFormMiddleware  = (req: TypeRequestBody<IUser>, res: Response, next: NextFunction) => {
    try {
        const { email, login, password } = req.body

        if (!email || email.indexOf('@') < 0) {
            throw ApiError.BadRequest('Email entered incorrectly')
        }
        if (!password) {
            throw ApiError.BadRequest('Enter password')
        }
        if (!login) {
            throw ApiError.BadRequest('Enter login')
        }
        if (password.length < 5) {
            throw ApiError.BadRequest('The password is too short')
        }
        next()
    } catch (error) {
        next(error)
    }
}