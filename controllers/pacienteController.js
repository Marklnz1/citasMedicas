const Cita = require("../models/Cita");
const Doctor = require("../models/Doctor");
const Paciente = require("../models/Paciente");
const HistoriaClinica = require("../models/HistoriaClinica");
const AreaMedica = require("../models/AreaMedica");

module.exports.cita_get = async (req,res,next)=>{
    const usuario = res.locals.user;

    if(usuario.tipoUsuario==="paciente"){
        const citas = [];
        for (const idCita of usuario.citas) {
          const citaBD = await Cita.findOne({ _id: idCita });
          const doctorBD = await Doctor.findOne({_id:citaBD.idDoctor});
          const cita = citaBD.toObject({virtuals:true});
          const areaMedicaBD = await AreaMedica.findById(cita.idAreaMedica);
          cita.areaMedica = areaMedicaBD.nombre;
          const doctor = doctorBD.toObject({virtuals:true});
          cita.doctor = doctor;
          citas.push(cita);
        }
        res.locals.citas = citas.reverse();
        res.render('paciente/cita/index');
    }else{
        next();
    }

   
}
module.exports.cita_id_delete = async (req,res,next)=>{
  const usuario = res.locals.user;
  if(usuario.tipoUsuario==="paciente"){
      const idCitaEliminar = req.params.idCita;
      const citaEliminada = await Cita.findById(idCitaEliminar);
      citaEliminada.estado = "cancelado";
      const paciente = await Paciente.findById(citaEliminada.idPaciente);
      const doctor = await Doctor.findById(citaEliminada.idDoctor);

      paciente.citas = paciente.citas.filter(function(cita) {
        return cita !== idCitaEliminar; 
      });
      doctor.citas = doctor.citas.filter(function(cita) {
        return cita !== idCitaEliminar; 
      });
      citaEliminada.save();
      paciente.save();
      doctor.save();
      res.status(200).end();
  }else{
      next();
  }

 
}
module.exports.cita_id_create_get = async (req,res,next)=>{
  const usuario = res.locals.user;
  if(usuario.tipoUsuario==="paciente"){
      const areasBD = await AreaMedica.find();
      const areas = [];
      for(const areaBD of areasBD){
        const area = areaBD.toObject({virtuals:true});
        for(const horario of area.horarios){
          const doctorHorarioBD = await Doctor.findById(horario.idDoctor);
          horario.doctor = doctorHorarioBD.toObject({virtuals:true});
        }
        areas.push(area);
      }
      res.locals.areas = areas;
      res.render('paciente/cita/create');
  }else{
      next();
  }
 
}

module.exports.cita_id_create_post = async (req,res,next)=>{
  const usuario = res.locals.user;
  const data = req.body;
 
  if(usuario.tipoUsuario==="paciente"){
    const idPaciente = data.idPaciente;
    const idAreaMedica = data.idAreaMedica;
    const fecha = data.fecha;
    const hora = data.hora;
    const idDoctor = data.idDoctor;
    const descripcion =data.descripcion;
    
    const nuevaCita = new Cita({idAreaMedica,idDoctor,idPaciente,fecha,hora,descripcion,estado:"pendiente"});
      await nuevaCita.save();
  
      const doctor = await Doctor.findById(idDoctor);
      doctor.citas.push(nuevaCita._id);
      doctor.save();
  
      const paciente = await Paciente.findById(idPaciente);
      paciente.citas.push(nuevaCita._id);
      paciente.save();
      res.status(200).end();
  }else{
      next();
  }

 
}
module.exports.historia_get = async (req,res,next)=>{
    const usuario = res.locals.user;
    if(usuario.tipoUsuario==="paciente"){
      const historiaClinica =await HistoriaClinica.findOne({_id:usuario.idHistoriaClinica});

      const hojasClinicas = historiaClinica.hojasClinicas.toObject({virtuals:true});
      for(const hoja of hojasClinicas){
        const doctorBD = await Doctor.findOne({_id:hoja.idDoctor});
        hoja.doctor = doctorBD.toObject({virtuals:true});
      }
      
      res.locals.hojasClinicas = hojasClinicas.reverse();
      res.render('paciente/historia/index');
    }else{
        next();
    }
   
}