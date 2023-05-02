export interface IRatingRequest {
    userId: number,
    movieId: number,
    rating: number
}

export interface IGetMovieWitchRating {
    query: {
        userId: number
    }
}

export interface IRatingReqRemove {
    userId: number,
    movieId: number,    
}