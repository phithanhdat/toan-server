
const usersController = require('../controllers').users;
const roundsController = require('../controllers').rounds;
const questController = require('../controllers').questions;
const scoreController = require('../controllers').scores;


module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
      message: 'API is working!!!',
    }));

    // Login
    app.post('/api/signup', usersController.create);
    app.post('/api/login', usersController.login);
    app.post('/api/users/update', usersController.updateInfo);
    app.get('/api/users/list', usersController.list);

    // Round
    app.get('/api/rounds/list', roundsController.list);

    // Question 
    app.get('/api/questions/list', questController.list);

    // scoreController
    app.post('/api/scores/update', scoreController.update);

}