const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arreglarString=(texto)=>{
    return texto
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const horarioAtencionSchema = new Schema({
    fecha:String,
    horas:[String],
    estado:String
});
const areaAtencionSchema = new Schema({
    areaMedica:String,
    horarios:[horarioAtencionSchema]
});
const doctorSchema = new Schema({
    nombre:String,
    apellido:String,
    dni:String,
    telefono:Number, 
    especialidad:String,
    yearXp:String,
    areasAtencion:[areaAtencionSchema],
    citas:[String],
    tipoUsuario:String,
    password:String,
    estado:String,
    email:String
});

doctorSchema.pre("save", function(next) {
    this.nombre = arreglarString(this.nombre);
    this.apellido = arreglarString(this.apellido);
    next();
  });
doctorSchema.virtual('nombreCompleto').get(function(){
    return this.nombre+" "+this.apellido;
});
const Doctor = mongoose.model('doctores',doctorSchema);
module.exports = Doctor;