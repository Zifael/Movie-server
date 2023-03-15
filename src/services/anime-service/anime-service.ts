import { ApiError } from "../../exception/ApiEroor";
import { Anime } from "../../models/anime-model/animeModel";
import { IAnime } from "../../types/types-anime";



class AnimeService {
    async create(anime: IAnime) {
        const animeDB = await Anime.findOne({ where: { title: anime.title } })
        if (animeDB) {
            throw ApiError.BadRequest('Аниме с таким названием уже существует')
        }
        const createAnime = await Anime.create(anime)  
        return {
            message: 'Аниме успешно создалось',
            anime: createAnime
        }
    }
}


export const animeService = new AnimeService()