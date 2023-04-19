const { Sequelize, DataTypes } = require('sequelize');



const sequelizeConnection = new Sequelize('postgres://xkkxqfpm:lBxWM6iC919vFi4JGsrKMBHTm_cShepI@otto.db.elephantsql.com:5432/xkkxqfpm', {
  define: {
   
    timestamps: false,
    schema: 'mobile_joe',
    }   
});

module.exports = sequelizeConnection;