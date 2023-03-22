import { DataTypes, HasManyAddAssociationsMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, Model, Optional } from "sequelize"
import { sequelize } from '../../database'
import { AnimeModel, RaitingModel } from "./types"


interface IAnimeCreate extends Optional<AnimeModel, 'id' | 'rating'>{}

class Anime extends Model<AnimeModel, IAnimeCreate> {
    declare addGenres: HasManyAddAssociationsMixin<Genre, number>
    declare setGenres: HasManySetAssociationsMixin<Genre, number>    
    declare id: number
    declare title: string
    declare rating: number
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

class Rating extends Model<RaitingModel> {
    declare id: number    
}

class FavoriteList extends Model {
    declare id: number
}

class FavoriteAnime extends Model {
    declare id: number
}

class AnimeGenre extends Model {
    declare id: number
}


Anime.init(
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, unique: true, allowNull: false },
        rating: { type: DataTypes.INTEGER, defaultValue: 0 },
        status: { type: DataTypes.STRING, allowNull: false },
        releaseDate: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        video: { type: DataTypes.STRING, allowNull: false },
        img: { type: DataTypes.STRING }
    },
    { sequelize, tableName: 'Anime'}
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
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true}
    },
    { sequelize, tableName: 'Rating' }
)

FavoriteList.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true}
    },
    { sequelize, tableName: 'FavoriteList' }
)


FavoriteAnime.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true}
    },
    { sequelize, tableName: 'FavoriteAnime' }
)

AnimeGenre.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true}
    },
    { sequelize, tableName: 'AnimeGenre' }
)





export {
    Anime,
    Rating,
    FavoriteList,
    FavoriteAnime,
    Genre,
    AnimeGenre
}