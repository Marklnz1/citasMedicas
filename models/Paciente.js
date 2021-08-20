const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arreglarString=(texto)=>{
    return texto
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
const pacienteSchema = new Schema({
    nombre:String,
    apellido:String,
    password:String,
    dni:String,
    telefono:Number, 
    direccion:String,
    idHistoriaClinica:String,
    citas:[String],
    estado:String,
    tipoUsuario:String,
});
pacienteSchema.pre("save", function(next) {
    this.nombre = arreglarString(this.nombre);
    this.apellido = arreglarString(this.apellido);
    next();
  });

pacienteSchema.virtual('nombreCompleto').get(function(){
    return this.nombre+" "+this.apellido;
});
const Paciente = mongoose.model('pacientes',pacienteSchema);
module.exports = Paciente;