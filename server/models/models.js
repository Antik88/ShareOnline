const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { model } = require('../db')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketThing = sequelize.define('basket_thing',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Thing = sequelize.define('thing',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    c_id: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const ThingInof = sequelize.define('thing_inof',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},
})

const CategoryType = sequelize.define('category_type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketThing)
BasketThing.belongsTo(Basket)

Category.hasMany(Thing)
Thing.belongsTo(Category)

Type.hasMany(Thing)
Thing.belongsTo(Type)

Thing.hasMany(Rating)
Rating.belongsTo(Thing)

Thing.hasMany(BasketThing)
BasketThing.belongsTo(Thing)

Thing.hasMany(ThingInof, {as: 'info'})
ThingInof.belongsTo(Thing)

Category.belongsToMany(Type, {through: CategoryType})
Type.belongsToMany(Category, {through: CategoryType})

module.exports = {
    User,
    Basket,
    BasketThing,
    Thing,
    Category,
    Type,
    Rating,
    CategoryType,
    ThingInof
}
