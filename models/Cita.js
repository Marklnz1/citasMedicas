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
  areaMedica: {type:String,ref:'areasmedicas'},
  doctor:{type: String,ref:'doctores'},
  paciente: {type:String,ref:'pacientes'},
  fecha: String,
  hora:String,
  descripcion: String,
  estado:String,
  motivoCancelacion:String
});


// citaSchema.virtual("fecha").set(function (fecha) {
//     this.fecha_iso = new Date(fecha);
//   });
//   citaSchema.virtual("fecha").get(function () {
//     return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
//   });
  const Cita = mongoose.model("citas", citaSchema);
  module.exports = Cita;