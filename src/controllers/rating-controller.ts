import { NextFunction, Response } from "express";
import { ratingService } from "../services/rating-service";
import { TypeRequestBody, TypeRequestParams } from "../types";
import { IGetMovieWitchRating, IRatingReqRemove, IRatingRequest } from "../types/types-rating";


class RatingController {
    async add(req: TypeRequestBody<IRatingRequest>, res: Response, next: NextFunction) {
        try {
            const { userId, movieId, rating } = req.body            
            const data = await ratingService.add(userId, movieId, rating)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async getMovieWitchRating(req: IGetMovieWitchRating, res: Response, next: NextFunction) {
        try {
            const { userId } = req.query            
            const movies = await ratingService.getMovie(userId)
            res.json(movies)
        } catch (error) {
            next(error)
        }
    }

    async remove(req: TypeRequestBody<IRatingReqRemove>, res: Response, next: NextFunction) {
        try {
            const { userId, movieId } = req.body
            await ratingService.remove(userId, movieId)
            res.json({ message: 'Rating removed' })
        } catch (error) {
            next(error)
        }
    }
}



export const ratingController = new RatingController()