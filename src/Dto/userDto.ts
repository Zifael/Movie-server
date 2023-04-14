import { IUserDTO } from "../types/type-user"

export class UserDto implements IUserDTO {
    id: number
    email: string
    login: string
    roles: string[]      

    constructor(id: number, email: string, login: string ,roles: string[]) {
        this.id = id
        this.email = email,
        this.login = login
        this.roles = roles
    }
}