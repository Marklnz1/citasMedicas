"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var adminSchema = new Schema({
  usuario: String,
  passwowrd: String,
  tipoUsuario: String
});
var Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;