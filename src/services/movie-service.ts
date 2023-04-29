import { ApiError } from "../exception/ApiEroor";
import { Movie, Genre } from "../models/movie-model/movieModel";
import { IMovie, IQueryMovie, IUpdateMovie } from "../types/types-movie";
import { createFiles } from "../helpers/createFiles";
import { deleteFiles } from "../helpers/deleteFiles";

 
class MovieService {
    async create(movie: IMovie, movieFiles: any) {       
        const { title, description, releaseDate, status, idGenre } = movie        
        
        const movieDB = await Movie.findOne({ where: { title: movie.title } })     
        const genreDb = await Genre.findAll({ where: { id: idGenre } })  

        if (movieDB) {
            throw ApiError.BadRequest('A film with this name already exists')
        }        
              
        if (genreDb.length === 0) {
            throw ApiError.NotFound('Genres sent in the request were not found in the database')
        }

        const {img, video} = createFiles(movieFiles)

        if (!video) {
            throw ApiError.BadRequest('Add a video file')
        }     

        const createMovie = await Movie.create({ title, description, releaseDate, status, img, video })       
        await createMovie.addGenres(genreDb)

        const result = await Movie.findOne({ 
            where: { title },
            include: Genre
        })
        return result
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

    async getOne(id: number) {
        const movie = await Movie.findOne({ 
            where: { id },
            include: Genre
        })
        if (!movie) {
            throw ApiError.NotFound('Movie not found')
        }
        return movie
    }

    async update(movieUpdate: IUpdateMovie, movieFilesUpdate: null | any) {        
        const { id, title, idGenre } = movieUpdate       
        
        const movie = await Movie.findOne({ where: { id } })        
        if (!movie) {
            throw ApiError.NotFound('No movie with this id was found')
        }        

        const movieTitle = await Movie.findOne({ where: { title }})
        if (movieTitle && movieTitle.title === title) {
            throw ApiError.BadRequest('A film with this name already exists')
        }
        
        let files = {} 
        if (movieFilesUpdate) {
            const { img, video } = movieFilesUpdate

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
        }            
        
        const update = await movie.update({ ...movieUpdate, ...files }) 
        
        if (idGenre) {
            const genreDb = await Genre.findAll({ where: { id: idGenre } })      
            await update.setGenres(genreDb)
        }        
        const result = await Movie.findOne({ 
            where: { title },
            include: Genre
        })
        return result
    }

    async delete(id: number) {               
        const movie = await Movie.findOne({ where: { id } })
        if (!movie) {
            throw ApiError.NotFound('No movie with this id was found')
        }
        // Deleting static files
        deleteFiles({ img: movie.img, video: movie.video })

        await movie.destroy()   
        return movie.id
    }
}

export const movieService = new MovieService()