const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsertSchema = new Schema({
  username: String,
  password: String
}, {
    collection: 'user'
});

const user = mongoose.model('user', UsertSchema)

module.exports = user;