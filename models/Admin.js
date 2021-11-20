const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    usuario:String,
    passwowrd:String,
    tipoUsuario:String
    
});
const Admin = mongoose.model('admin',adminSchema);
module.exports = Admin;