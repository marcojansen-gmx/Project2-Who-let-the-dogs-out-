module.exports = (sequelize, Sequelize) => {
  const Dog = sequelize.define('Dog', {
    breed: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dogName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER
    },
    sex: {
      type: Sequelize.BOOLEAN
    },
    desexed: {
      type: Sequelize.BOOLEAN
    },
    allergies: {
      type: Sequelize.STRING,
      allowNull: false
    },
    childFriendly: {
      type: Sequelize.BOOLEAN
    },
    userText: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    dogImage: {
      type: Sequelize.BLOB('long')
    }
  });
  Dog.associate = (db) => {
    Dog.belongsTo(db.User);
  };

  return Dog;
};
