const Cita = require('../models/Cita');
const AreaMedica = require("../models/AreaMedica");
const Doctor = require("../models/Doctor");
const Paciente = require('../models/Paciente');



module.exports.cita_get = async (req, res,next) => {
    if (res.locals.user.tipoUsuario === "paciente") {
        const citas = [];
        for(idCita of res.locals.user.citas){
            const cita = (await Cita.findById(idCita)).toObject({virtuals:true});
            cita.doctor = await Doctor.findById(cita.idDoctor);
            cita.areaMedica = await AreaMedica.findById(cita.idAreaMedica);
            citas.push(cita);
        }
        res.locals.citas = citas;
        res.render("paciente/vercitaspendientespaciente");
    }else{
        next();
    }
        
}

module.exports.cita_create_get = async (req,res,next)=>{
    if (res.locals.user.tipoUsuario === "paciente") {
        const areasMedicasBD = await AreaMedica.find({});
        const areasMedicas = [];
        for(area of areasMedicasBD){
            areasMedicas.push(area.toObject());
        }

        for(area of areasMedicas){
            
            for(let i = 0; i < area.doctores.length;i++){
                area.doctores[i] = (await Doctor.findById(area.doctores[i])).toObject({virtuals:true});
            }
        }

        res.locals.areasMedicas = areasMedicas;
        res.render("registro/registroCita");
    }else{
        next();
    }
    
    
}

module.exports.cita_create_post =async (req,res)=>{
    const datosCita = req.body;
    datosCita.estado = "disponible";

    const nuevaCita = new Cita(datosCita);
    await nuevaCita.save();

    const doctor = await Doctor.findById(datosCita.idDoctor);
    doctor.citas.push(nuevaCita._id);
    doctor.save();
  
    const paciente = await Paciente.findById(datosCita.idPaciente);
    paciente.citas.push(nuevaCita._id);
    paciente.save();
    res.status(200).end();
}