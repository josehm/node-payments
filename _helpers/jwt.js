const expressJwt = require('express-jwt');
//const config = require('config.json');
const config = {secret: 'example'};

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
      // public routes that don't require authentication
      path: [
        '/',
        '/auth/register',
        '/auth/login'
      ]
    });
}