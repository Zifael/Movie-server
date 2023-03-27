import { IUserDTO } from "../types/type-user"

export class UserDto implements IUserDTO {
    email: string
    login: string
    roles: string[]      

    constructor(email: string, login: string ,roles: string[]) {
        this.email = email,
        this.login = login
        this.roles = roles
    }
}