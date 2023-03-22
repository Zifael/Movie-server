import { NextFunction, Request, Response } from "express"
import { Anime } from "../../models/anime-model/animeModel"
import { animeService } from "../../services/anime-service/anime-service"
import { TypeRequestBody, TypeRequestParams, TypeRequestQurey } from "../../types"
import { IAnime, IQueryAnime, IUpdateAnime } from "../../types/types-anime"

class AnimeController {
    async create(req: TypeRequestBody<IAnime>, res: Response, next: NextFunction) {
        try {
            const anime = await animeService.create(req.body, req.files)            
            return res.json(anime)
        } catch (error) {                  
            next(error)            
        }
    }

    async getAll(req: TypeRequestQurey<IQueryAnime>, res: Response, next: NextFunction) {
        try {            
            const anime = await animeService.getAll(req.query)        
            res.json(anime)
        } catch (error) {
            next(error)
        }
    }

    async getOne(req: TypeRequestParams<{ title: string }>, res: Response, next: NextFunction) {
        try {
            const {title} = req.params            
            const animeOne = await Anime.findOne({ where: { title } } )            
            res.json(animeOne)
        } catch (error) {
            next(error)
        }
    }

    async update(req: TypeRequestBody<IUpdateAnime>, res: Response, next: NextFunction) {
        try {            
            await animeService.update(req.body, req.files)
            res.json({ message: 'Обновление выполнено' })
        } catch (error) {
            next(error)
        }
    }

    async delete(req: TypeRequestBody<{ id: number }>, res: Response, next: NextFunction) {
        try {
            await animeService.delete(req.body.id)
            res.json({ message: 'Аниме удаленно' })
        } catch (error) {
            next(error)
        }
    }
}


export default new AnimeController()