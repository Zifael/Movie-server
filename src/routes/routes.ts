import { Router } from "express";
import animeRouter from "./anime-router";
import genreRouter from './genre-router'

const router = Router()
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.use('/anime', animeRouter)
router.use('/genre', genreRouter)

export default router



