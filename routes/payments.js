'use strict';

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/pay', paymentController.pay, (req, res) => {
  res.json({ data: req.redirectUrl });
});

router.get('/platforms/:platformName/transactions/:id', paymentController.show, (req, res) => {
  //Test rout
  const platformName = req.params.platformName;
  const userId = req.params.id;
  res.json({ data: platformName + " " + userId });
});

//router.get('/approval', paymentController.approval);
//router.get('/cancelled', paymentController.cancelled);
module.exports = router;
