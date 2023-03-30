import { Router } from "express";
import movieRouter from "./movie-router";
import genreRouter from './genre-router';
import userRouter from './user-router' 
import roleRouter from './role-router'
import favoriteMovie from "./faviorteMovie-router";
import ratingRouter from "./rating-router";
import { checkAdmminMiddleware } from "../middlewares/checkAdmin-middleware";

const router = Router()

router.use('/movie', movieRouter)
router.use('/genre', genreRouter)
router.use('/user', userRouter)
router.use('/role', checkAdmminMiddleware, roleRouter)
router.use('/favoriteMovie', favoriteMovie)
router.use('/rating', ratingRouter)

export default router



