import { Router } from "express"
import { favoriteMovieController } from "../controllers/favoriteMovie-controller"
import { authMiddleware } from "../middlewares/auth-middleware"

const favoriteMovie = Router()

favoriteMovie.post('/', authMiddleware, favoriteMovieController.create)
favoriteMovie.get('/', authMiddleware, favoriteMovieController.getAll)
favoriteMovie.delete('/', authMiddleware, favoriteMovieController.remove)

export default favoriteMovie