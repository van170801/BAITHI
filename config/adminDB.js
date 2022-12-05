const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdmintSchema = new Schema({
  useradmin: String,
  password: String
}, {
    collection: 'admin'
});

const admin = mongoose.model('admin', AdmintSchema)

module.exports = admin;