//Ingredient data model

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');

const Ingredient = sequelize.define("ingredients",{
    
    ingredientId: {
        type: DataTypes.INTEGER,
        field: 'ingredient_id',
        primaryKey: true,
        autoIncrement: true
    },
    ingredientName:{
        type: DataTypes.STRING,
        field: 'ingredient_name'
    },
    ingredientType:{
        type: DataTypes.STRING,
        field: 'ingredient_type'
    }

})

module.exports = Ingredient;