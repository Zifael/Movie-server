import { NextFunction } from "express";
import { Request, Response } from "express";
import { Genre } from "../../models/anime-model/animeModel";
import { genreService } from "../../services/genre-service/genre-service";
import { TypeRequestBody } from "../../types";
import { IGenre } from "../../types/types-genre";

class GenreController {
    async create(req: TypeRequestBody<IGenre> , res: Response, next: NextFunction) {
        try {          
            const { genre } = req.body     
               
            const genreCreate = await genreService.create(genre)

            return res.json({message: 'Жанр успешно создан', genre: genreCreate})
            
        } catch (error) {
            next(error)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const genre = await Genre.findAll()
            res.json({genre})
        } catch (error) {
            next(error)
        }
    }
}

export default new GenreController()