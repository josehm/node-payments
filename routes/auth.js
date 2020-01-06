'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.route('/login')
  .post(
    authController.authenticate,
    authController.generateToken,
    authController.sendToken);

router.route('/register')
  .post(
    userController.store,
    authController.generateToken,
    authController.sendToken);

module.exports = router;
