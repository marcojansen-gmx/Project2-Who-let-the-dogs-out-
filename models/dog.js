const { DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const dog = config.define('dog', {
  breed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desexed: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  allergies: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chieldfriendly: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

dog.associate = (user) => {
  // Associating Author with Posts
  // When an Author is deleted, also delete any associated Posts
  dog.belongsTo(user, { as: 'user_id', constraints: false });
};

dog.sync();

module.exports = dog;
