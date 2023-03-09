import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../database"

class User extends Model {
    declare id: number
    declare email: string
    declare password: string    
}

class Role extends Model {
    declare id: number
    declare value: string
}

class UserRole extends Model {
    declare id: number
}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false } 
    },
    { sequelize, tableName: 'User' }
)

Role.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
        value: {type: DataTypes.STRING, unique: true, allowNull: false},
        
    },
    { sequelize, tableName: 'Role' }
)

UserRole.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true}
    },
    { sequelize, tableName: 'UserRole' }
)



export {
    User,
    Role,
    UserRole
}