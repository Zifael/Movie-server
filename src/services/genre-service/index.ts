import { ApiError } from "../../exception/ApiEroor"
import { Genre } from "../../models/movie-model/movieModel"

export class GenreService {
    async create(genre: string) {
        const genreDb = await Genre.findOne({ where: { genre } })
        if (genreDb) {
            throw ApiError.BadRequest(`The genre with this name "${genre}" has already been created`)
        } 
        
        const createGenre = await Genre.create({genre})
        return createGenre.genre        
    }
}

export const genreService = new GenreService()