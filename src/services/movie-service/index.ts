import { ApiError } from "../../exception/ApiEroor";
import { Movie, Genre } from "../../models/movie-model/movieModel";
import { IMovie, IQueryMovie, IUpdateMovie } from "../../types/types-movie";
import { createFiles } from "../../helpers/createFiles";
import { deleteFiles } from "../../helpers/deleteFiles";

 
class MovieService {
    async create(movie: IMovie, movieFiles: any) {       
        const { title, description, releaseDate, status, idGenre } = movie        
        
        const movieDB = await Movie.findOne({ where: { title: movie.title } })     
        const genreDb = await Genre.findAll({ where: { id: idGenre } })  

        if (movieDB) {
            throw ApiError.BadRequest('Аниме с таким названием уже существует')
        }        
              
        if (genreDb.length === 0) {
            throw ApiError.NotFound('Жанры, отправленые в запросе, не найдены в базе данных')
        }

        const {img, video} = createFiles(movieFiles)

        if (!video) {
            throw ApiError.BadRequest('Добавьте видеофайл')
        }     

        const createMovie = await Movie.create({ title, description, releaseDate, status, img, video })       
        await createMovie.addGenres(genreDb)                 
        return {            
            message: 'Аниме успешно создано'          
        }
    }

    async getAll(queryMovie: IQueryMovie) {
        let {genre, limit, page} = queryMovie        
        page = page || 1
        limit = limit || 12        
        const offset = page * limit - limit
        
        let movie 
            
        if (genre) {
            movie = await Movie.findAndCountAll({
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
            movie = await Movie.findAndCountAll({
                include: Genre,
                limit,
                offset                
            })
        }
        return movie
    }

    async update(movieUpdate: IUpdateMovie, movieFilesUpdate: any) {        
        const { id, idGenre } = movieUpdate
        const { img, video } = movieFilesUpdate
        
        const movie = await Movie.findOne({ where: { id } })        
        if (!movie) {
            throw ApiError.NotFound('Аниме с таким id не найдено')
        }        
        
        let files = {}       

        if (img) {
            // Deleting old static files
            deleteFiles({ img: movie.img })
            // And create new static files
            files = {...files, ...createFiles({ img })}
        }  
        if (video) {
            // Deleting old static files
            deleteFiles({ video: movie.video })
            // And create new static files
            files = {...files, ...createFiles({ video })}
        }       
        
        const update = await movie.update({ ...movieUpdate, ...files }) 
        
        if (idGenre) {
            const genreDb = await Genre.findAll({ where: { id: idGenre } })      
            await update.setGenres(genreDb)
        }        
    }

    async delete(id: number) {    
        console.log(id)    
        const movie = await Movie.findOne({ where: { id } })
        if (!movie) {
            throw ApiError.NotFound('Аниме с таким id не найдено')
        }
        // Deleting static files
        deleteFiles({ img: movie.img, video: movie.video })
        await movie.destroy()
              
    }
}

export const movieService = new MovieService()