'use strict';

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index);
router.post('/', productController.store);

module.exports = router;