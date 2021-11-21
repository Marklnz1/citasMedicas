const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaMedicaSchema = new Schema({
    nombre:String,
    doctores:[{type:String,ref:'doctores'}]
    
});

// horarioAtencionSchema.virtual("fecha").set(function (fecha) {
//     this.fecha_iso = new Date(fecha);
//   });
//   horarioAtencionSchema.virtual("fecha").get(function () {
//     return this.fecha_iso.toISOString().substring(0, 10).replace(/-/g,"/");
//   });
const AreaMedica = mongoose.model('areasmedicas',areaMedicaSchema);
module.exports = AreaMedica;
