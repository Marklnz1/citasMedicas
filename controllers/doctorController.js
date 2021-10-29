const HistoriaClinica = require("../models/HistoriaClinica");
const Paciente = require("../models/Paciente");
const AreaMedica = require("../models/AreaMedica");
const Cita = require("../models/Cita");
module.exports.cita_get = async (req, res,next) => {
    if (res.locals.user.tipoUsuario === "doctor") {
        const citas = [];
        for(idCita of res.locals.user.citas){
            const cita = (await Cita.findById(idCita)).toObject({virtuals:true});
            cita.paciente = await Paciente.findById(cita.idPaciente);
            cita.areaMedica = await AreaMedica.findById(cita.idAreaMedica);
             citas.push(cita);
        }
        res.locals.citas = citas;
        res.render("doctor/vercitaspendientesdoctor");
    }else{
        next();
    }
    
}

module.exports.historia_create_get = async (req, res,next) => {
    if (res.locals.user.tipoUsuario === "doctor") {
        res.locals.paciente = await Paciente.findOne({dni:req.params.dniPaciente});
        res.locals.areasMedicas = await AreaMedica.find();
        res.render("doctor/historia/create");
    }else{
        next();
    }
    

}

module.exports.historia_create_post = async (req,res) => {
    const datosHojaClinica = req.body;
    datosHojaClinica.idDoctor = res.locals.user._id;
    const paciente = await Paciente.findOne({dni:req.body.dniPaciente});
    const idHistoriaPaciente = paciente.idHistoriaClinica;
    const historiaPaciente = await HistoriaClinica.findOne({_id:idHistoriaPaciente});
    historiaPaciente.hojasClinicas.push(datosHojaClinica);
    await historiaPaciente.save();
    res.status(201).json(req.body);
}