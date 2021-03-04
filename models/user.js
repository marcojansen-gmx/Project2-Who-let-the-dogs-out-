const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postcode: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // // In this case, before a User is created, we will automatically hash their password
  User.addHook('beforeCreate', function (User) {
    User.password = bcrypt.hashSync(User.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
