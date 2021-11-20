const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recetaSchema = new Schema({
  indicaciones: String,
  medicamentos: String,
});
const hojaClinicaSchema = new Schema({
  fecha: String,
  areaMedica:{type:String,ref:'areasmedicas'},
  descripcion: String,
  doctor: {type:String,ref:'doctores'},
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
