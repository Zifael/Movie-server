import { NextFunction, Response } from "express";
import { favoriteMovieService } from "../services/favoriteMovie-service";
import { TypeRequestBody, TypeRequestQurey } from "../types";
import { IFavoriteRequest } from "../types/types-favoriteMovie";


class FavoriteMovieController {
    async create(req: TypeRequestBody<IFavoriteRequest>, res: Response, next: NextFunction) {
        try {
            const { userId, movieId } = req.body
            const favoriteMovie = await favoriteMovieService.create(userId, movieId)
            res.json({ favoriteMovie, message: 'The movie has been added to the favorites list' })
        } catch (error) {
            next(error)
        }
    }

    async getAll(req: TypeRequestQurey<{ userId: number }>, res: Response, next: NextFunction) {
        try {
            const { userId } = req.query
            const favotiresMovie = await favoriteMovieService.getAll(userId)
            res.json({ favotiresMovie })
        } catch (error) {
            next(error)
        }
    }

    async remove(req: TypeRequestBody<IFavoriteRequest>, res: Response, next: NextFunction) {
        try {
            const { userId, movieId } = req.body
            await favoriteMovieService.remove(userId, movieId)
            res.json({ message: 'Movie removed from favorites' })
        } catch (error) {
            next(error)
        }
    }
}


export const favoriteMovieController = new FavoriteMovieController()