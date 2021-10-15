const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const arreglarString=(texto)=>{
    return texto
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
const citaSchema = new Schema({
  idAreaMedica: String,
  idDoctor: String,
  idPaciente: String,
  fecha_iso: Date,
  hora:String,
  descripcion: String,
  estado:String
});


citaSchema.virtual("fecha").set(function (fecha) {
    this.fecha_iso = new Date(fecha);
  });
  citaSchema.virtual("fecha").get(function () {
    return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
  });
  const Cita = mongoose.model("citas", citaSchema);
  module.exports = Cita;