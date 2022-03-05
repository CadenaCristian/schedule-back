'use strict';
const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());
app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
console.log('My App');