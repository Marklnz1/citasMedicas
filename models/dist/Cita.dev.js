"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var arreglarString = function arreglarString(texto) {
  return texto.toLowerCase().split(' ').map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

var citaSchema = new Schema({
  areaMedica: {
    type: String,
    ref: 'areasmedicas'
  },
  doctor: {
    type: String,
    ref: 'doctores'
  },
  paciente: {
    type: String,
    ref: 'pacientes'
  },
  fecha: String,
  hora: String,
  descripcion: String,
  estado: String,
  motivoCancelacion: String
}); // citaSchema.virtual("fecha").set(function (fecha) {
//     this.fecha_iso = new Date(fecha);
//   });
//   citaSchema.virtual("fecha").get(function () {
//     return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
//   });

var Cita = mongoose.model("citas", citaSchema);
module.exports = Cita;