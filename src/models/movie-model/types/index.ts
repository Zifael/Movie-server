import { Optional } from "sequelize"



export interface MovieModel {
    id: number
    title: string
    rating: number
    numberOfRating: number
    status: 'Вышел' | 'Онгоинг' | 'Еще не вышел'
    releaseDate: string
    description: string
    video: string
    img?: string
}
export interface IMovieCreate extends Optional<MovieModel, 'id' | 'rating' | 'numberOfRating'>{}

export type RaitingModel = {
    id: number 
    rating: number
    UserId: number
    MovieId: number    
}
export interface IRaitingCreate extends Optional<RaitingModel, 'id'>{}

export type FavroiteMovieModel = {
    id: number
    FavoriteListId: number
    MovieId: number
}
export interface IFavoriteMovieCreate extends Optional<FavroiteMovieModel, 'id'>{}

export type FavoriteListModel = {
    id: number,
    UserId: number
}
export interface IFavoriteListCreate extends Optional<FavoriteListModel, 'id'>{}