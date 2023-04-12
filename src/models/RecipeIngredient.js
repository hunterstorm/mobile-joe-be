//OBM data model

const sequelize = require('../sequelizeConnection');

const RecipeIngredient = sequelize.define("recipe_ingredients")

module.exports = RecipeIngredient