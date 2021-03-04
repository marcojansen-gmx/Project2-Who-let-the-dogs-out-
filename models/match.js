module.exports = (sequelize, Sequelize) => {
  const Match = sequelize.define('Match', {
    requestingDog: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dogRequesting: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Match;
};
