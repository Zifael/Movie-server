import { Rating } from "../models/movie-model/movieModel";
import { RaitingModel } from "../models/movie-model/types";

export const calculatingRating = async (MovieId: number) => {
    const ratings = await Rating.findAll({ where: { MovieId } })    
    const result = ratings.reduce((accumulator, current, index) => {
        accumulator += Number(current.rating)
        if (index === ratings.length - 1) {
            return accumulator / ratings.length
        }
        return accumulator
    }, 0)    
    return Math.round(result * 10) / 10
}