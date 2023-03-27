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


