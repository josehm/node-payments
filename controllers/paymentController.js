'use stric'

const models = require('../models');
const paymentFactory = require('../services/payments/paymentFactory');

async function pay(req, res, next) {
  //validate data
  const data = req.body;
  const service = paymentFactory.createPaymentPlatform(data.payment_service);
  
  try {
    const redirectUrl = await service.handlePayment(data);
    req.redirectUrl = redirectUrl;
    next();
  } catch (error) {
    return error;
  }
}

async function show(req, res, next) {
  next();
}

function approval(req, res, next) {
  //We need platformId and paymentIntentId
  //1.- Get platform Class
  //2.- Check payment status
  //3.- Return response
}

function cancelled(req, res, next) {
}



module.exports = {pay, approval, cancelled, show}