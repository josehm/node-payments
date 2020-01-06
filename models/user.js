'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    password: DataTypes.STRING
  },
  {
    hooks: {
      beforeCreate: (user) => {
        return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => { 
            throw new Error(); 
        });
      }
    }
  });

  User.prototype.validPassword = (password) => {
    bcrypt.compare(password, this.password).then( (result) => {
      return result;
    });
  }

  return User;
};