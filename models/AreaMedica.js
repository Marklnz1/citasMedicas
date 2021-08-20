const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const horarioAtencionSchema = new Schema({
    fecha_iso:Date,
    horas:[String],
    idDoctor:String,
    estado:String
});
const areaMedicaSchema = new Schema({
    nombre:String,
    doctores:[String],
    horarios:[horarioAtencionSchema]
});

horarioAtencionSchema.virtual("fecha").set(function (fecha) {
    this.fecha_iso = new Date(fecha);
  });
  horarioAtencionSchema.virtual("fecha").get(function () {
    return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
  });
const AreaMedica = mongoose.model('areasMedicas',areaMedicaSchema);
module.exports = AreaMedica;
