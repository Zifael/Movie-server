import { ApiError } from "../../exception/ApiEroor";
import { Anime, Genre } from "../../models/anime-model/animeModel";
import { IAnime, IQueryAnime, IUpdateAnime, IFilesAnime } from "../../types/types-anime";
import { createFiles } from "../../helpers/createFiles";
import { deleteFiles } from "../../helpers/deleteFiles";

 
class AnimeService {
    async create(anime: IAnime, animeFiles: any) {       
        const { title, description, releaseDate, status, idGenre } = anime        
        
        const animeDB = await Anime.findOne({ where: { title: anime.title } })     
        const genreDb = await Genre.findAll({ where: { id: idGenre } })  

        if (animeDB) {
            throw ApiError.BadRequest('Аниме с таким названием уже существует')
        }

        if (!idGenre) {
            throw ApiError.BadRequest('При создание аниме не было добавлено никаких жанров')
        }
              
        if (genreDb.length === 0) {
            throw ApiError.NotFound('Жанры, отправленые в запросе, не найдены в базе данных')
        }

        const {img, video} = createFiles(animeFiles)

        if (!video) {
            throw ApiError.BadRequest('Добавьте видеофайл')
        }       

        const createAnime = await Anime.create({ title, description, releaseDate, status, img, video })       
        createAnime.addGenres(genreDb)                 
        
        return {
            message: 'Аниме успешно создано'          
        }
    }

    async getAll(queryAnime: IQueryAnime) {
        let {genre, limit, page} = queryAnime        
        page = page || 1
        limit = limit || 12        
        const offset = page * limit - limit
        
        let anime 
            
        if (genre) {
            anime = await Anime.findAndCountAll({
                include: {
                    model: Genre,
                    where: {
                        genre
                    }
                },
                limit,
                offset
            })
        } else {
            anime = await Anime.findAndCountAll({
                include: Genre,
                limit,
                offset                
            })
        }
        return anime
    }

    async update(animeUpdate: IUpdateAnime, animeFilesUpdate: any) {        
        const { id, idGenre } = animeUpdate
        const { img, video } = animeFilesUpdate
        
        const anime = await Anime.findOne({ where: { id } })        
        if (!anime) {
            throw ApiError.NotFound('Аниме с таким id не найдено')
        }        
        
        let files

        if (img) {
            // Deleting old static files
            deleteFiles({ img: anime.img })
            // And create new static files
            files = createFiles({ img })
        }  
        if (video) {
            // Deleting old static files
            deleteFiles({ video: anime.video })
            // And create new static files
            files = createFiles({ video })
        }       
        
        const update = await anime.update({ ...animeUpdate, ...files }) 
        
        if (idGenre) {
            const genreDb = await Genre.findAll({ where: { id: idGenre } })      
            update.setGenres(genreDb)
        }        
    }

    async delete(id: number) {        
        const anime = await Anime.findOne({ where: { id } })
        if (!anime) {
            throw ApiError.NotFound('Аниме с таким id не найдено')
        }
        // Deleting static files
        deleteFiles({ img: anime.img, video: anime.video })
        await anime.destroy()
              
    }
}

export const animeService = new AnimeService()