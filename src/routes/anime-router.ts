import { Router } from "express";
import AnimeController from '../controllers/animeController/animeController'

const animeRouter = Router()


animeRouter.post('/', AnimeController.create)
animeRouter.get('/', AnimeController.getAll)
animeRouter.get('/:id', AnimeController.getOne)

export default animeRouter