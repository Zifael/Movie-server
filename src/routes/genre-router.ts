import { Router } from "express";
import { genreController }  from "../controllers/genre-controller";
import { checkAdmminMiddleware } from "../middlewares/checkAdmin-middleware";

const genreRouter = Router()

genreRouter.post('/', checkAdmminMiddleware, genreController.create)
genreRouter.get('/', genreController.getAll)

export default genreRouter