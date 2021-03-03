module.exports = (sequelize, Sequelize) => {
  const DailyMatchCounter = sequelize.define('DailyMatchCounter', {
    numMatches: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return DailyMatchCounter;
};
