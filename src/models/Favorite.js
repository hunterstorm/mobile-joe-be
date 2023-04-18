//N:N data model

const sequelize = require('../sequelizeConnection');

const Favorite = sequelize.define("favorites");

module.exports = Favorite;