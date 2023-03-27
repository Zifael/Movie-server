import { DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyGetAssociationsMixin, Model, Optional } from "sequelize"
import { sequelize } from "../../database"
import { RefreshTokenModel, UserModel } from "./types"


interface IUserCreate extends Optional<UserModel, 'id' | 'isActivate'>{}

class User extends Model<UserModel, IUserCreate> {
    declare addRoles: HasManyAddAssociationsMixin<Role, number>
    declare getRoles: HasManyGetAssociationsMixin<Role>
    declare id: number
    declare email: string
    declare login: string
    declare password: string   
    declare activateLink: string 
    declare isActivate: boolean
}

class Role extends Model {
    declare addUser: HasManyAddAssociationMixin<User, number>
    declare id: number
    declare value: string
}

class UserRole extends Model {
    declare id: number
}

interface IRefreshTokenCreate extends Optional<RefreshTokenModel, 'id'>{}

class RefreshToken extends Model<RefreshTokenModel, IRefreshTokenCreate> {
    declare id: number
    declare refreshToken: string
    declare UserId: ForeignKey<User['id']>
}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        login: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        activateLink: { type: DataTypes.STRING, unique: true },
        isActivate: { type: DataTypes.BOOLEAN, defaultValue: false } 
    },
    { sequelize, tableName: 'User' }
)

Role.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
        value: { type: DataTypes.STRING, unique: true, allowNull: false },
        
    },
    { sequelize, tableName: 'Role' }
)

UserRole.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true }
    },
    { sequelize, tableName: 'UserRole' }
)

RefreshToken.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
        refreshToken: { type: DataTypes.STRING },
        UserId: { type: DataTypes.INTEGER }
    },
    { sequelize, tableName: 'RefreshToken' }
)

export {
    User,
    Role,
    UserRole,
    RefreshToken
}