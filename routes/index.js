const express = require('express');
const app = express();

app.use('/users', require('../services/users/users'));

module.exports = app;