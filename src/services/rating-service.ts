import { ApiError } from "../exception/ApiEroor"
import { calculatingRating } from "../helpers/calculatingRating"
import { Movie, Rating } from "../models/movie-model/movieModel"
import { User } from "../models/user-model/userModel"


class RatingService {

    async add(UserId: number, MovieId: number, rating: number) {
        const user = await User.findOne({ where: { id: UserId } })
        const movie = await Movie.findOne({ where: { id: MovieId } })

        if (!user) {
            throw ApiError.NotFound('User not found')
        }        
        if (!movie) {
            throw ApiError.NotFound('Movie not found')
        }    
        if (0 > rating || rating > 5) {
            throw ApiError.BadRequest('The minimum value is 0, the maximum is 5')
        }

        const ratingPrevious = await Rating.findOne({ where: { UserId: user.id, MovieId: movie.id } })   
        
        if (!ratingPrevious) {
            await Rating.create({UserId, MovieId, rating})
        }   
        /* 
            if the user has already set a rating,
            then we simply replace the rating in the table                
        */         
        if (ratingPrevious) {
            // if the previous rating of the movie is equal to the specified one, an error message is displayed
            if (ratingPrevious.rating === Number(rating)) {
                throw ApiError.BadRequest('The change did not occur because the previous estimate is equal to the specified')
            }   
            movie.numberOfRating -= 1
            await movie.save()

            ratingPrevious.rating = rating
            await ratingPrevious.save()
        }       
        
        const ratings = await Rating.findAll({ where: { MovieId } })
        // Сounting all the ratings of the film
        const result = await calculatingRating(movie.id)
        //  Saving the rating of the movie in the database
        movie.rating = result
        movie.numberOfRating += 1        
        await movie.save()

        return {
            movieRating: movie.rating,
            numberOfRating: movie.numberOfRating
        }
    }

    async remove(UserId: number, MovieId: number) {
        const rating = await Rating.findOne({ where: { UserId, MovieId } })
        const movie = await Movie.findOne({ where: { id: MovieId } })
        if (!rating) {
            throw ApiError.NotFound('The rating of this film is not set')
        }
        if (!movie) {
            throw ApiError.NotFound('Movie not found')
        }
        await rating.destroy()
        const result = await calculatingRating(MovieId)
        movie.rating = result
        movie.numberOfRating -= 1
        await movie.save()
    }
}



export const ratingService = new RatingService()