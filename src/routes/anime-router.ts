import { Router } from "express";
import AnimeController from '../controllers/animeController/animeController'

const animeRouter = Router()




animeRouter.post('/', AnimeController.create)
animeRouter.get('/', AnimeController.getAll)
animeRouter.get('/:title', AnimeController.getOne)
animeRouter.put('/', AnimeController.update)
animeRouter.delete('/', AnimeController.delete)

export default animeRouter