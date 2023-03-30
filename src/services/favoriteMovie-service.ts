import { ApiError } from "../exception/ApiEroor"
import { FavoriteList, FavoriteMovie, Movie } from "../models/movie-model/movieModel"
import { User } from "../models/user-model/userModel"



class FavoriteMovieService {

    async create(UserId: number, MovieId: number) {

        if (!UserId) {
            throw ApiError.BadRequest('Invalid user id sent')
        }
        if (!MovieId) {
            throw ApiError.BadRequest('Invalid movie id sent')
        }

        let favoriteList = await FavoriteList.findOne({ where: { UserId } })
        // if the user does not have a favorites list, then create it
        if (!favoriteList) {
            throw ApiError.NotFound('The list of favorites of this user was not found')
        }         

        const favorite = await FavoriteMovie.findOne({ where: { FavoriteListId: favoriteList.id, MovieId} })
        // if the movie is already in the favorites list, we issue an error message
        if (favorite) {
            throw ApiError.BadRequest(`This movie has already been added to the favorites list`)
        }

        await FavoriteMovie.create({ FavoriteListId: favoriteList.id, MovieId })        
    }

    async getAll(UserId: number) {
        // find the list of favorites of this user
        let userList = await FavoriteList.findOne({ where: { UserId } })
        if (!userList) {
            throw ApiError.NotFound('The list of favorites of this user was not found')
        }     
        // We get all the movies from the found list above   
        const favotiresMovie = await FavoriteMovie.findAll({ 
            where: { FavoriteListId: userList.id }, 
            include: Movie
        })
        return favotiresMovie
    }

    async remove(UserId: number, MovieId: number) {        
        // find the list of favorites of this user
        let userList = await FavoriteList.findOne({ where: { UserId } })
        if (!userList) {
            throw ApiError.NotFound('The list of favorites of this user was not found')
        }     
        await FavoriteMovie.destroy({ where: { FavoriteListId: userList.id, MovieId } })
    }
}


export const favoriteMovieService = new FavoriteMovieService()