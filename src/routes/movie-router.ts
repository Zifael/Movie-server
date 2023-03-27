import { Router } from "express";
import { movieController } from '../controllers/movie-сontroller'

const animeRouter = Router()

animeRouter.post('/', movieController.create)
animeRouter.get('/', movieController.getAll)
animeRouter.get('/:title', movieController.getOne)
animeRouter.put('/', movieController.update)
animeRouter.delete('/', movieController.delete)

export default animeRouter