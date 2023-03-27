export interface UserModel {
    id: number
    email: string
    login: string
    password: string
    activateLink: string
    isActivate: boolean
}

export interface RefreshTokenModel {
    id: number,
    refreshToken: string,
    UserId: number
}

export interface ISetLogin {
    id: number,
    login: string
}