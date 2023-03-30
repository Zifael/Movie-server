export interface UserModel {
    id: number
    email: string
    login: string
    password: string
    activateLink: string
    isActivate: boolean
    resetCode: string
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

export interface getAdimn {
    userId: number
    key: string,
}