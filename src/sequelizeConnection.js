const { Sequelize, DataTypes } = require('sequelize');



const sequelizeConnection = new Sequelize('postgres://hunterstorm:DigitalCrafts@cloud-database-instance.ccpqgrq3czty.us-west-2.rds.amazonaws.com:5432/cloud_database', {
  define: {
   
    timestamps: false,
    schema: 'mobile_joe',
    }   
});

module.exports = sequelizeConnection;