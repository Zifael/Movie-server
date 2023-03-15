
import {User, Role, UserRole} from './user-model/userModel'
import { Anime, FavoriteAnime, FavoriteList, Rating, Genre, AnimeGenre } from './anime-model/animeModel'



User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

Anime.belongsToMany(Genre, { through: AnimeGenre })
Genre.belongsToMany(Anime, { through: AnimeGenre })

User.hasMany(Rating)
Rating.belongsTo(User)

Anime.hasOne(Rating)
Rating.belongsTo(Anime)

User.hasOne(FavoriteList)
FavoriteList.belongsTo(User)

FavoriteList.hasMany(FavoriteAnime)
FavoriteAnime.belongsTo(FavoriteList)


export default {
    User, 
    Role,    
    Anime,
    Rating,
    FavoriteList,
    FavoriteAnime,
    Genre
}
