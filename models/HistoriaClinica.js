const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recetaSchema = new Schema({
  descripcion: String,
  medicamentos: String,
});
const hojaClinicaSchema = new Schema({
  fecha_iso: Date,
  area: String,
  triage: String,
  consulta: String,
  idDoctor: String,
  receta: recetaSchema,
});
hojaClinicaSchema.virtual("fecha").set(function (fecha) {
  this.fecha_iso = new Date(fecha);
});
hojaClinicaSchema.virtual("fecha").get(function () {
  return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
});
const historiaClinicaSchema = new Schema({
  hojasClinicas: [hojaClinicaSchema],
});

const HistoriaClinica = mongoose.model(
  "historiasClinicas",
  historiaClinicaSchema
);
module.exports = HistoriaClinica;
