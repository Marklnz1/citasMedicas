"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var areaMedicaSchema = new Schema({
  nombre: String,
  doctores: [{
    type: String,
    ref: 'doctores'
  }]
}); // horarioAtencionSchema.virtual("fecha").set(function (fecha) {
//     this.fecha_iso = new Date(fecha);
//   });
//   horarioAtencionSchema.virtual("fecha").get(function () {
//     return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
//   });

var AreaMedica = mongoose.model('areasmedicas', areaMedicaSchema);
module.exports = AreaMedica;