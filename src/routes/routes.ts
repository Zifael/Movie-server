import { Router } from "express";
import animeRouter from "./anime-router";

const router = Router()

router.use('/anime', animeRouter)

export default router



