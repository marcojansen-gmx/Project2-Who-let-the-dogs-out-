module.exports = (sequelize, Sequelize) => {
  const dailyMatchCounter = sequelize.define('dailyMatchCounter', {
    numMatches: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  dailyMatchCounter.associate = (db) => {
    dailyMatchCounter.belongsTo(db.user);
  };
  return dailyMatchCounter;
};
