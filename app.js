var express = require('express');
var logger = require('morgan');
const cors = require('cors');
global.__basedir = __dirname;

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/', (req, res, next) => {
    console.log('MID: Request Type:', req.method);
    next();
})

// route
require('./routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Wellcome to the dum',
}));

module.exports = app;