import { Router } from "express";
import GenreController  from "../controllers/genreController/genreController";

const genreRouter = Router()

genreRouter.post('/', GenreController.create)
genreRouter.get('/', GenreController.getAll)

export default genreRouter