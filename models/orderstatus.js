'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define('OrderStatus', {
    keyName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  OrderStatus.associate = function(models) {
    // associations can be defined here
  };
  return OrderStatus;
};