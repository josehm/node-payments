'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    quantitySold: DataTypes.DOUBLE,
    pricePerUnit: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    taxAmount: DataTypes.DOUBLE,
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {});
  OrderProduct.associate = function(models) {
    // associations can be defined here
  };
  return OrderProduct;
};