const { DataTypes } = require('sequelize');
const sequelizeConn = require('../config/config.json');
const bcrypt = require('bcryptjs');
const user = sequelizeConn.define('user', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postcode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

user.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
user.addHook('beforeCreate', function (user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});

user.sync();

module.exports = user;
