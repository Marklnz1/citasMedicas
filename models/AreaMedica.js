const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaMedicaSchema = new Schema({
    nombre:String,
    doctores:[String]
    
});

// horarioAtencionSchema.virtual("fecha").set(function (fecha) {
//     this.fecha_iso = new Date(fecha);
//   });
//   horarioAtencionSchema.virtual("fecha").get(function () {
//     return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
//   });
const AreaMedica = mongoose.model('areasMedicas',areaMedicaSchema);
module.exports = AreaMedica;
