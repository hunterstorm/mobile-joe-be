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
    },
    imageName: {
        type: DataTypes.STRING,
        field: "image_name"
    } 
    // favorites: {
    //     type: DataTypes.ARRAY(DataTypes.INTEGER),
    //     defaultValue: []
    // }
})

module.exports = Recipe;