'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    datePaid: DataTypes.DATE,
    saleAmount: DataTypes.DOUBLE,
    saleAmountPaid: DataTypes.DOUBLE,
    taxAmount: DataTypes.DOUBLE,
    orderStatusId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};