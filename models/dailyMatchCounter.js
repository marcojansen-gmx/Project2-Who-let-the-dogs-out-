module.exports = (sequelize, Sequelize) => {
  const dailyMatchCounter = sequelize.define('dailyMatchCounter', {
    numMatches: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_date: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  return dailyMatchCounter;
};
