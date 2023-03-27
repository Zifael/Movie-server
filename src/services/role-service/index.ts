import { ApiError } from "../../exception/ApiEroor"
import { Role, User } from "../../models/user-model/userModel"

class RoleService {
    async create(value: string) {        
        const roleDB = await Role.findOne({ where: { value } })
        if (roleDB) {
            throw ApiError.BadRequest('Such a role already exists')
        }
        const role = await Role.create({ value })
        return role
    }

    async giveRole(idRole: number, idUser: number) {
        const role = await Role.findOne({ where: { id: idRole } })
        if (!role) { 
            throw ApiError.BadRequest('Role not found')
        }
        const user = await User.findOne({ where: { id: idUser } })
        if (!user) {
            throw ApiError.BadRequest('User not found')
        }
        role.addUser(user)
        return { message: `The role ${role.value} has been added to the user: ${user.email}` }
    }
}

export const roleService = new RoleService()