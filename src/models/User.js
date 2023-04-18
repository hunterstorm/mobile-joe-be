// User data model

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConnection');


const User = sequelize.define('user', {
    
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id'
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    }
    // favorites: {
    //     type: DataTypes.ARRAY(DataTypes.INTEGER),
    //     defaultValue: []
    // }

  });

  module.exports = User;