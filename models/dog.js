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
      type: Sequelize.STRING,
      allowNull: false
    },
    desexed: {
      type: Sequelize.BOOLEAN
    },
    allergies: {
      type: Sequelize.STRING,
      allowNull: false
    },
    childfriendly: {
      type: Sequelize.BOOLEAN
    },
    usertext: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    dogImage: {
      type: Sequelize.BLOB,
      allowNull: false
    }
  });

  Dog.associate = (db) => {
    Dog.belongsTo(db.User);
  };

  return Dog;

};
