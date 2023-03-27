import { Router } from "express";
import movieRouter from "./movie-router";
import genreRouter from './genre-router';
import userRouter from './user-router' 
import roleRouter from './role-router'

const router = Router()

router.use('/anime', movieRouter)
router.use('/genre', genreRouter)
router.use('/user', userRouter)
router.use('/role', roleRouter)

export default router



