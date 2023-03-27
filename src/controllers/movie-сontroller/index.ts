import { NextFunction, Response } from "express"
import { Movie } from "../../models/movie-model/movieModel"
import { movieService } from "../../services/movie-service"
import { TypeRequestBody, TypeRequestParams, TypeRequestQurey } from "../../types"
import { IMovie, IQueryMovie, IUpdateMovie } from "../../types/types-movie"

class MovieController {
    async create(req: TypeRequestBody<IMovie>, res: Response, next: NextFunction) {
        try {
            const data = await movieService.create(req.body, req.files)            
            return res.json(data)
        } catch (error) {                  
            next(error)            
        }
    }

    async getAll(req: TypeRequestQurey<IQueryMovie>, res: Response, next: NextFunction) {
        try {            
            const movie = await movieService.getAll(req.query)        
            res.json(movie)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req: TypeRequestParams<{ title: string }>, res: Response, next: NextFunction) {
        try {
            const { title } = req.params            
            const movieOne = await Movie.findOne({ where: { title } } )            
            res.json(movieOne)
        } catch (error) {
            next(error)
        }
    }

    async update(req: TypeRequestBody<IUpdateMovie>, res: Response, next: NextFunction) {
        try {            
            await movieService.update(req.body, req.files)
            res.json({ message: 'Обновление выполнено' })
        } catch (error) {
            next(error)
        }
    }

    async delete(req: TypeRequestBody<{ id: number }>, res: Response, next: NextFunction) {
        try {
            await movieService.delete(req.body.id)
            res.json({ message: 'Аниме удаленно' })
        } catch (error) {
            next(error)
        }
    }
}


export const movieController = new MovieController()