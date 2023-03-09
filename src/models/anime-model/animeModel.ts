import { DataTypes, Model } from "sequelize"
import { sequelize } from '../../database'
import { AnimeModel, RaitingModel } from "./types"


class Anime extends Model<AnimeModel> {
    declare id: number
    declare title: string
    declare rating: string
    declare status: 'Вышел' | 'Онгоинг' | 'Еще не вышел'
    declare releaseDate: string
    declare description: string   
    declare linkPlayer: string
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

Anime.init(
    {
        id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, unique: true, allowNull: false },
        rating: { type: DataTypes.STRING },
        status: { type: DataTypes.STRING, allowNull: false },
        releaseDate: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        linkPlayer: { type: DataTypes.STRING, allowNull: false }
    },
    { sequelize, tableName: 'Anime'}
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


export {
    Anime,
    Rating,
    FavoriteList,
    FavoriteAnime
}