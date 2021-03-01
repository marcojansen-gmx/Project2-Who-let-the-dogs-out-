module.exports = (sequelize, Sequelize) => {
  const match = sequelize.define('match', {
    requestingDog: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dogRequesting: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  return match;
};
