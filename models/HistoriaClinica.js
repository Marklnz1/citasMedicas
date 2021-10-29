const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recetaSchema = new Schema({
  indicaciones: String,
  medicamentos: String,
});
const hojaClinicaSchema = new Schema({
  fecha: String,
  idArea: String,
  descripcion: String,
  idDoctor: String,
  receta: recetaSchema,
});

const historiaClinicaSchema = new Schema({
  hojasClinicas: [hojaClinicaSchema],
});

const HistoriaClinica = mongoose.model(
  "historiasClinicas",
  historiaClinicaSchema
);
module.exports = HistoriaClinica;
