import { Request, Response } from "express"
import { animeService } from "../../services/anime-service/anime-service"
import { TypeRequestBody } from "../../types"
import { iRequestBody } from "../../types/types-anime"


class AnimeController {

    create(req: TypeRequestBody<iRequestBody>, res: Response ) {
        const { title, description, linkPlayer, releaseDate, status} = req.body
        animeService.create()
        res.send({message: 'hello'})
    }

    getAll(req: Request, res: Response) {
        
    }

    getOne(req: Request, res: Response) {
        
    }
}


export default new AnimeController()