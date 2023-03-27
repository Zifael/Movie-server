import { Router } from "express";
import { genreController }  from "../controllers/genre-controller";

const genreRouter = Router()

genreRouter.post('/', genreController.create)
genreRouter.get('/', genreController.getAll)

export default genreRouter