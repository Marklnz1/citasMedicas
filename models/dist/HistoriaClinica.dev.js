"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var recetaSchema = new Schema({
  indicaciones: String,
  medicamentos: String
});
var hojaClinicaSchema = new Schema({
  fecha: String,
  areaMedica: {
    type: String,
    ref: 'areasmedicas'
  },
  descripcion: String,
  doctor: {
    type: String,
    ref: 'doctores'
  },
  receta: recetaSchema
});
var historiaClinicaSchema = new Schema({
  hojasClinicas: [hojaClinicaSchema]
});
var HistoriaClinica = mongoose.model("historiasClinicas", historiaClinicaSchema);
module.exports = HistoriaClinica;