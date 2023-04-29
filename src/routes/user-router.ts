import { Router } from "express";
import { userController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { validationFormMiddleware } from "../middlewares/validationForm-middleware";

const userRouter = Router()


userRouter.post('/registration', validationFormMiddleware, userController.create)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/refresh', userController.refresh)
// Activating a profile by email
userRouter.get('/activate/:link', userController.activate) 
userRouter.put('/change-login', authMiddleware, userController.changeLogin)
userRouter.put('/change-password', authMiddleware, userController.changePassword)
userRouter.post('/sendMessageResetPassowrd', userController.sendMessageResetPassword)
userRouter.post('/resetPassowrd', userController.resetPassword)
userRouter.post('/getAdmin', authMiddleware, userController.getAdimn)
export default userRouter