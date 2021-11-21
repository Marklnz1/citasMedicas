"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var arreglarString = function arreglarString(texto) {
  return texto.toLowerCase().split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

var pacienteSchema = new Schema({
  nombre: String,
  apellido: String,
  password: String,
  dni: String,
  telefono: Number,
  telefonoFamiliar: Number,
  direccion: String,
  historiaClinica: String,
  citas: [String],
  estado: String,
  tipoUsuario: String,
  email: String
});
pacienteSchema.pre("save", function (next) {
  this.nombre = arreglarString(this.nombre);
  this.apellido = arreglarString(this.apellido);
  next();
});
pacienteSchema.virtual('nombreCompleto').get(function () {
  return this.nombre + " " + this.apellido;
});
var Paciente = mongoose.model('pacientes', pacienteSchema);
module.exports = Paciente;