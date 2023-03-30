import { Router } from "express";
import { roleController } from "../controllers/role-controller";


const roleRouter = Router()


roleRouter.post('/', roleController.create)
roleRouter.post('/give', roleController.giveRole)
roleRouter.get('/', roleController.getAll)
roleRouter.delete('/', roleController.removeRoleAdimn)

export default roleRouter