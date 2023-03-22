import { ApiError } from "../../exception/ApiEroor"
import { Genre } from "../../models/anime-model/animeModel"

export class GenreService {
    async create(genre: string) {
        const genreDb = await Genre.findOne({ where: { genre } })
        if (genreDb) {
            throw ApiError.BadRequest(`Жанр с таким названием: '${genre}' уже был создан`)
        } 
        
        const createGenre = await Genre.create({genre})
        return createGenre.genre        
    }
}

export const genreService = new GenreService()