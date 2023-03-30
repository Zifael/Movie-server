import { DataTypes, DATE, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, Model } from "sequelize"
import { sequelize } from '../../database'
import { FavoriteListModel, FavroiteMovieModel, IFavoriteListCreate, IFavoriteMovieCreate, IMovieCreate, IRaitingCreate, MovieModel, RaitingModel } from "./types"




class Movie extends Model<MovieModel, IMovieCreate> {
    declare addGenres: HasManyAddAssociationsMixin<Genre, number>
    declare setGenres: HasManySetAssociationsMixin<Genre, number>    
    declare id: number
    declare title: string
    declare rating: number
    declare numberOfRating: number
    declare status: 'Вышел' | 'Онгоинг' | 'Еще не вышел'
    declare releaseDate: string
    declare description: string   
    declare video: string  
    declare img?: string     
}

class Genre extends Model {
    declare id: number
    declare genre: string
}

class Rating extends Model<RaitingModel, IRaitingCreate> {
    declare id: number   
    declare rating: number 
    declare UserId: number
    declare MovieId: number    
}

class FavoriteList extends Model<FavoriteListModel, IFavoriteListCreate> {
    declare id: number
    declare UserId: number
}

class FavoriteMovie extends Model<FavroiteMovieModel, IFavoriteMovieCreate> {
    declare id: number
    declare FavoriteListId: number
    declare MovieId: number
}

class MovieGenre extends Model {
    declare id: number
}


Movie.init(
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, unique: true, allowNull: false },
        rating: { type: DataTypes.DECIMAL, defaultValue: 0 },
        numberOfRating: { type: DataTypes.INTEGER, defaultValue: 0 },
        status: { type: DataTypes.STRING, allowNull: false },
        releaseDate: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        video: { type: DataTypes.STRING, allowNull: false },
        img: { type: DataTypes.STRING }
    },
    { sequelize, tableName: 'Movie'}
)

Genre.init(
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
        genre: {type: DataTypes.STRING, unique: true, allowNull: false}
    },
    { sequelize, tableName: 'Genre' }
)

Rating.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
        rating: { type: DataTypes.INTEGER },
        UserId: { type: DataTypes.INTEGER },
        MovieId: { type: DataTypes.INTEGER }
    },
    { sequelize, tableName: 'Rating' }
)

FavoriteList.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
        UserId: { type: DataTypes.INTEGER }
    },
    { sequelize, tableName: 'FavoriteList' }
)


FavoriteMovie.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
        FavoriteListId: { type: DataTypes.INTEGER },
        MovieId: { type: DataTypes.INTEGER }
    },
    { sequelize, tableName: 'FavoriteMovie' }
)

MovieGenre.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true }
    },
    { sequelize, tableName: 'MovieGenre' }
)

export {
    Movie,
    Rating,
    FavoriteList,
    FavoriteMovie,
    Genre,
    MovieGenre
}