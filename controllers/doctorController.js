const Cita = require("../models/Cita");
const Doctor = require("../models/Doctor");
const Paciente = require("../models/Paciente");
const HistoriaClinica = require("../models/HistoriaClinica");
const AreaMedica = require("../models/AreaMedica");
const mongoose = require("mongoose");
module.exports.cita_get = async (req, res, next) => {
  const usuario = res.locals.user;

  if (usuario.tipoUsuario === "doctor") {
    const citas = [];
    for (const idCita of usuario.citas) {
      const ctBD = await Cita.findOne({ _id: idCita });
      const pcBD = await Paciente.findOne({_id:ctBD.idPaciente});
      const cita = ctBD.toObject({virtuals:true});
      const areaMedicaBD = await AreaMedica.findById(cita.idAreaMedica);
      cita.areaMedica = areaMedicaBD.nombre;
      const paciente = pcBD.toObject({virtuals:true});
      cita.paciente = paciente;
      citas.push(cita);
    }
    res.locals.citas = citas.reverse();
    res.render("doctor/cita/index");
  } else {
    next();
  }
};

module.exports.historia_get = async (req, res, next)=>{
  const usuario = res.locals.user;

  if (usuario.tipoUsuario === "doctor") {
    res.render("doctor/historia/index");
  } else {
    next();
  }
}
module.exports.paciente_id_get = async (req, res, next)=>{
  const usuario = res.locals.user;

  if (usuario.tipoUsuario === "doctor") {
      const paciente = await Paciente.findOne({dni:req.params.dniPaciente});
      res.status(201).json(paciente);
  } else {
    next();
  }
}
module.exports.historia_id_get = async (req, res, next)=>{
    const usuario = res.locals.user;

    if (usuario.tipoUsuario === "doctor") {
      const idPaciente = req.params.idPaciente;

      if (!idPaciente.match(/^[0-9a-fA-F]{24}$/)){
        res.render("404");
        return;
      }
      const pcBD = await Paciente.findOne({_id:req.params.idPaciente});
      if(pcBD==null){
        res.render("404");
        return;
      }
      const paciente = pcBD.toObject({virtuals:true});

      res.locals.paciente = paciente;
      const historiaClinica =await HistoriaClinica.findOne({_id:paciente.idHistoriaClinica});

      const hojasClinicas = historiaClinica.hojasClinicas.toObject({virtuals:true});
      for(const hoja of hojasClinicas){
        const doctorBD = await Doctor.findOne({_id:hoja.idDoctor});
        hoja.doctor = doctorBD.toObject({virtuals:true});
      }
      
      res.locals.hojasClinicas = hojasClinicas.reverse();
      res.render("doctor/historia/details");
    } else {
      next();
    }
}

module.exports.historia_create_get = async (req, res, next)=>{
  const usuario = res.locals.user;
  if (usuario.tipoUsuario === "doctor") {
    const paciente = await Paciente.findOne({_id:req.params.idPaciente});
    res.locals.paciente = paciente;
    const areasMedicas = await AreaMedica.find();
    res.locals.areasMedicas = areasMedicas;
    res.render("doctor/historia/create");
  } else {
    next();
  }
}
module.exports.historia_create_post = async (req, res, next)=>{

  const usuario = res.locals.user;
  if (usuario.tipoUsuario === "doctor") {
    const idDoctor = req.body.idDoctor;
    const idHistoriaClinica = req.body.idHistoriaClinica;
    const fecha = req.body.fecha;
    const area = req.body.area;
    const triage = req.body.triage;
    const consulta = req.body.consulta;
    const descripcion = req.body.descripcion;
    const medicamentos = req.body.medicamentos;
    const receta = {descripcion,medicamentos};
    const hojaClinica =  {fecha,area,triage,consulta,idDoctor,receta}
    const historiaClinica =await HistoriaClinica.findOne({_id:idHistoriaClinica});
    historiaClinica.hojasClinicas.push(hojaClinica);
    await historiaClinica.save();
    res.status(201).json({mensaje:"hoja Clinica Creada"});
  } else {
    next();
  }
}