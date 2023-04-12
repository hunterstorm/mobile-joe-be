const { Sequelize, DataTypes } = require('sequelize');


const sequelizeConnection = new Sequelize('postgres://postgres:mtndew@localhost:5432/postgres', {
    define: {
        timestamps: false,
        schema:'mobile_joe'
    }
})

module.exports = sequelizeConnection