require('dotenv').config();
const mongoose = require('mongoose');
const user = process.env.USER_CREDENTIAL;
const password = process.env.PASSWORD_CREDENTIAL;
const uri = ``;
console.log(uri)
mongoose.connect('mongodb://localhost:27017/Schedule')
    .then(() => console.log("Base de datos conectada!"))
    .catch(e => console.log(e))

module.exports = mongoose;
