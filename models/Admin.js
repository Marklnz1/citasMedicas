const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    usuario:String,
    password:String
    
});
const Admin = mongoose.model('admin',adminSchema,"admin");
module.exports = Admin;