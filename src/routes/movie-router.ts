import { Router } from "express";
import { movieController } from '../controllers/movie-controller'
import { checkAdmminMiddleware } from "../middlewares/checkAdmin-middleware";

const movieRouter = Router()

movieRouter.post('/', checkAdmminMiddleware, movieController.create)
movieRouter.get('/', movieController.getAll)
movieRouter.get('/:id', movieController.getOne)
movieRouter.put('/', checkAdmminMiddleware, movieController.update)
movieRouter.delete('/', checkAdmminMiddleware, movieController.delete)

export default movieRouter