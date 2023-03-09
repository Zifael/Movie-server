
import { Anime, FavoriteAnime, FavoriteList, Rating } from './anime-model/animeModel'
import {User, Role, UserRole} from './user-model/userModel'


User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

User.hasMany(Rating)
Rating.belongsTo(User)

Anime.hasOne(Rating)
Rating.belongsTo(Anime)

User.hasOne(FavoriteList)
FavoriteList.belongsTo(User)

FavoriteList.hasMany(FavoriteAnime)
FavoriteAnime.belongsTo(FavoriteList)



export const model =  {
    User, 
    Role,    
    Anime,
    Rating,
    FavoriteList,
    FavoriteAnime
}
