const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
}, { versionKey: false })

module.exports = mongoose.model('users', UsersSchema);