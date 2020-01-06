'use strict';

const models  = require('../models');
//const buildParams = require('./helpers').buildParams;
//const validParams = ['email','name','password'];

function index(req, res) {
  models.User.findAll()
  .then(users => {
    res.json({ data: users });
  })
  .catch(error=>{
    console.log(error);
    res.status(422).json({ error });
  })
}

function store(req, res, next) {
  //let params = buildParams(validParams,req.body);
  models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    birthDate: new Date(Date.UTC(2016, 0, 1)),//req.body.birthDate,
    password: req.body.password
  })
  .then((user) => {
    req.user = user;
    next();
    //res.json({ data: user });
  })
  .catch(error=>{
    console.log(error);
    res.status(422).json({ error })
  })
}

function update(req, res) {
  const userId = req.params.id;
  models.User.findByPk(userId).then(user => {
    user.userName = req.body.userName,
    user.firstName = req.body.firstName
    user.save()
    .then((user) => {
      res.json({ data: user });
    })
    .catch(error=>{
      console.log(error);
      res.status(422).json({ error });
    })
  })
}

function destroy(req, res) {
  const userId = req.params.id;
  models.User.findByPk(userId)
  .then(user => {
    user.destroy();
    res.json({ data: user });
  })
  .catch(error=>{
    console.log(error);
    res.status(422).json({ error });
  })
}

module.exports = { index, store, update, destroy }