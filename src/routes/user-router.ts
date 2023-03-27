import { Router } from "express";
import { userController } from "../controllers/user-controller";

const userRouter = Router()


userRouter.post('/registration', userController.create)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.post('/refresh', userController.refresh)
userRouter.put('/change-login', userController.changeLogin)
userRouter.get('/activate/:link', userController.activate)
userRouter.post('/check-password', userController.checkPassword)
userRouter.put('/change-password', userController.changePassword)


export default userRouter