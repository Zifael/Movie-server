
import {User, Role, UserRole, RefreshToken} from './user-model/userModel'
import { Movie, FavoriteMovie, FavoriteList, Rating, Genre, MovieGenre } from './movie-model/movieModel'



User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

Movie.belongsToMany(Genre, { through: MovieGenre })
Genre.belongsToMany(Movie, { through: MovieGenre })

User.hasMany(RefreshToken)
RefreshToken.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Movie.hasOne(Rating)
Rating.belongsTo(Movie)

User.hasOne(FavoriteList)
FavoriteList.belongsTo(User)

FavoriteList.hasMany(FavoriteMovie)
FavoriteMovie.belongsTo(FavoriteList)


export default {
    User, 
    Role,    
    Movie,
    Rating,
    FavoriteList,
    FavoriteMovie,
    Genre
}
