import { Router } from "express";
import { roleController } from "../controllers/role-controller/role-controller";

const roleRouter = Router()

roleRouter.post('/', roleController.create)
roleRouter.post('/give', roleController.giveRole)
roleRouter.get('/', roleController.getAll)


export default roleRouter