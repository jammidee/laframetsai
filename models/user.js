'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastseen: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });

  // Add hooks to set the 'lastseen' column
  User.beforeCreate((user, options) => {
    // Set 'lastseen' to the current datetime when a new record is created
    user.lastseen = new Date();
  });

  //User.beforeUpdate((user, options) => {
  //  // Set 'lastseen' to the current datetime when an existing record is updated
  //  user.lastseen = new Date();
  //});



  return User;
};