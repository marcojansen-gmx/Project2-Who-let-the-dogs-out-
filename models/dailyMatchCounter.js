const { DataTypes } = require('sequelize');
const sequelizeConn = require('../config/config.json');

const dailyMatchCounter = sequelizeConn.define('match', {
  numMatches: DataTypes.INTEGER,
  created_at: DataTypes.DATE
});

dailyMatchCounter.associate = (user) => {
  dailyMatchCounter.belongsTo(user, { as: 'user_id', constraints: false });
};

dailyMatchCounter.sync();

module.exports = dailyMatchCounter;
