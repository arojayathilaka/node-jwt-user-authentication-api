const expressJwt = require('express-jwt');
const config = require('../config.json');

jwt = () => {
    const { secret } = config;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            //'/podcasts/add'
        ]
    });
}
module.exports = jwt;
