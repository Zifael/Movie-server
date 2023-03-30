import { ApiError } from "../exception/ApiEroor"
import { Role, User, UserRole } from "../models/user-model/userModel"

class RoleService {
    async create(value: string) {        
        const roleDB = await Role.findOne({ where: { value } })
        if (roleDB) {
            throw ApiError.BadRequest('Such a role already exists')
        }
        const role = await Role.create({ value })
        return role
    }

    async giveRole(RoleId: number, UserId: number) {
        const role = await Role.findOne({ where: { id: RoleId } })
        if (!role) { 
            throw ApiError.BadRequest('Role not found')
        }
        const user = await User.findOne({ where: { id: UserId } })
        if (!user) {
            throw ApiError.BadRequest('User not found')
        }
        const userRole = await UserRole.findOne({ where: { RoleId, UserId } })
        if (userRole) {
            throw ApiError.BadRequest('This user already has a given role')
        }
        role.addUser(user)
        return { message: `The role ${role.value} has been added to the user: ${user.email}` }
    }

    async removeRoleAdimn(userId: number, key: string) {
        const user = await User.findOne({ where: { id: userId } })        
        if (!user) {
            throw ApiError.NotFound('User not found')
        }
        
        let roleAdmin = await Role.findOne({ where: { value: 'ADMIN' } })
        if (!roleAdmin) {
            throw ApiError.NotFound('Role not found')
        }

        if (key !== process.env.GET_ADMIN) {            
            throw ApiError.BadRequest('Invalid key')            
        }
        
        await user.removeRole(roleAdmin)
        return { message: `${roleAdmin.value} role removed` }
    }
}

export const roleService = new RoleService()