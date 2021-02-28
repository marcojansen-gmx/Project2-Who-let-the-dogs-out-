const { DataTypes } = require('sequelize');
const sequelizeConn = require('../config/config.json');

const match = sequelizeConn.define('match', {
  requestingDog: DataTypes.INTEGER,
  dogRequesting: DataTypes.INTEGER,
  created_at: DataTypes.DATE
});

match.sync();

module.exports = match;
