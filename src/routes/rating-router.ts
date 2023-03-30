import { Router } from "express"
import { ratingController } from "../controllers/rating-controller"
import { authMiddleware } from "../middlewares/auth-middleware"

const ratingRouter = Router()

ratingRouter.post('/', authMiddleware, ratingController.add)
ratingRouter.delete('/', authMiddleware, ratingController.remove)

export default ratingRouter