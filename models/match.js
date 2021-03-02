module.exports = (sequelize, Sequelize) => {
  const match = sequelize.define('match', {
    requestingDog: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dogRequesting: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return match;
};
