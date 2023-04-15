//Recipes data model

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');

const Recipe = sequelize.define("recipes",{

    recipeId:{
        type: DataTypes.INTEGER,
        field: 'recipe_id',
        primaryKey: true,
        autoIncrement: true
    },
    recipeName:{
        type: DataTypes.STRING,
        field: 'recipe_name'
    },
    recipeType:{
        type: DataTypes.STRING,
        field: 'recipe_type'
    },
    description: {
        type: DataTypes.TEXT,
        field: 'description'
      }
})

module.exports = Recipe;