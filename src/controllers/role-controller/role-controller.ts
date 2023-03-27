import { NextFunction, Response, Request } from "express";
import { ApiError } from "../../exception/ApiEroor";
import { Role, User } from "../../models/user-model/userModel";
import { roleService } from "../../services/role-service";
import { TypeRequestBody } from "../../types";
import { IAddRole, IRole } from "../../types/type-role";


class RoleController {
    async create(req: TypeRequestBody<IRole>, res: Response, next: NextFunction) {
        try {
            const { value } = req.body
            const role = await roleService.create(value)
            res.json({ message: 'Role successfully created', role })
        } catch (error) {
            next(error)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const roles = await Role.findAll()
            res.json(roles)
        } catch (error) {
            next(error)
        }
    }

    async giveRole(req: TypeRequestBody<IAddRole>, res: Response, next: NextFunction) {
        try {
            const { idRole, idUser } = req.body
            const data = roleService.giveRole(idRole, idUser)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}


export const roleController = new RoleController()