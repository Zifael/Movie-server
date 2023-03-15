import { NextFunction, Request, Response } from "express"
import { Anime } from "../../models/anime-model/animeModel"
import { animeService } from "../../services/anime-service/anime-service"
import { TypeRequestBody } from "../../types"
import { IAnime } from "../../types/types-anime"

class AnimeController {
    async create(req: TypeRequestBody<IAnime>, res: Response, next: NextFunction) {
        try {
            const anime = await animeService.create(req.body)
            return res.json({message: 'Аниме успешно создалось', anime})
        } catch (error) {                  
            next(error)            
        }
    }

    async getAll(req: Request, res: Response) {
        const anime = await Anime.findAll()        
        res.json(anime)
    }

    getOne() {

    }
}


export default  new AnimeController()