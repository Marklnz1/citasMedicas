"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var adminSchema = new Schema({
  usuario: String,
  password: String
});
var Admin = mongoose.model('admin', adminSchema, "admin");
module.exports = Admin;