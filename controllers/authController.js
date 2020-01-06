const jwt = require('jsonwebtoken');
//const secrets = require('../config/secrets');
const secrets = {jwtSecret: 'example'};

const models  = require('../models');


function authenticate(req,res,next){

  models.User.findOne({  where:{ user_name: req.body.userName } })
    .then( user =>{
      if (!user) {
        next(new Error('Invalid Credentials'));
      } else if (!user.validPassword(req.body.password)) {
        next(new Error('Invalid Credentials'));
      } else {
        req.user = user;
        next();
      }
    })
    .catch( error => next(error) );
}

function generateToken(req,res,next){
  if(!req.user) return next();

  req.token = jwt.sign({id: req.user.id}, secrets.jwtSecret);

  next();
}

function sendToken(req,res){
  if (req.user) {
    res.json({
      user: req.user,
      jwt: req.token
    })
  }
  else {
    res.status(422).json({
      error: 'Could not create user'
    })
  }
}


module.exports = {
  authenticate,
  generateToken,
  sendToken
}
