const express = require('express');
const router = express.Router();
const config = require('../config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

router.route('/authenticate').post((req, res) => {
    // users.find()
    //     .then(podcasts =>
    //         res.status(200).send(podcasts)
    //     )
    //     .catch(err =>
    //         res.status(400).send({message: 'Error: ' + err})
    //     );
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    const userWithoutPassword = omitPassword(user);
    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    const authenticatedUser = { ...userWithoutPassword, token };
    res.status(200).send(authenticatedUser);
});

omitPassword = user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = router;
