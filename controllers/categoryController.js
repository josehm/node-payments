'use strict';

const models  = require('../models');

async function index(req, res) {
  try {
    const categories = await models.Category.findAll();
    res.json({data: categories})
  } catch (error) {
    console.log(error)
    res.status(422).json({ error })
  }
}

async function store(req, res, next) {
  try {
    const category = await models.Category.create({
      name: req.body.name,
      description: req.body.name
    });
    res.status(201).json({data: category});
  } catch (error) {
    console.log(eror);
    res.status(422).json({error});
  }
}

module.exports = {index, store};