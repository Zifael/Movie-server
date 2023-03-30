import { Request } from 'express'

export interface IUser {
    email: string
    login: string
    password: string
}

export interface IUserDTO {
    email: string,
    roles: string[]
}


export interface IChangePassword {
    id: number,
    password: string
}


export interface TypeResetPassword extends Request {
    body: {
        password: string
    },
    query: {
        code: string
    }
}