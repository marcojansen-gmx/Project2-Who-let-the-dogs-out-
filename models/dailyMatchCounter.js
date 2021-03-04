module.exports = (sequelize, Sequelize) => {
  const DailyMatchCounter = sequelize.define('DailyMatchCounter', {
    numMatches: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  DailyMatchCounter.associate = (db) => {
    DailyMatchCounter.belongsTo(db.User);
  };

  return DailyMatchCounter;
};
