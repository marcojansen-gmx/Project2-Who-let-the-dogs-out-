module.exports = (sequelize, Sequelize) => {
  const dailyMatchCounter = sequelize.define('dailyMatchCounter', {
    numMatches: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return dailyMatchCounter;
};
