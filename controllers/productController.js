'use strict';

const models  = require('../models');

async function index(req, res) {
  try {
    const products = await models.Product.findAll();
    res.json({data: products})
  } catch (error) {
    res.status(422).json({ error });
  }
}

async function store(req, res) {
  try {
    const product = await models.Product.create({
      sku: req.body.sku,
      name: req.body.name,
      price: req.body.price,
      categoryId: req.body.categoryId
    });
    res.json({data: product});
  } catch (error) {
    res.status(422).json({error});
  }
}

module.exports = {index, store}