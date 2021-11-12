const Cita = require('../models/Cita');
const AreaMedica = require("../models/AreaMedica");
const Doctor = require("../models/Doctor");
const Paciente = require('../models/Paciente');
const HistoriaClinica = require("../models/HistoriaClinica");


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

module.exports.historia_get = async(req, res)=>{

    let pag = req.query.pag;
    await cargarHojasClinicas(pag,res);
    res.render("paciente/historia");
};

module.exports.cita_cancel_post = async(req, res)=>{
    const cita = await Cita.findById(req.body.idCita);
    cita.estado = "cancelado";
    cita.motivoCancelacion = "req.body.motivo";
    await cita.save();
    console.log(req.body,"asdasd")
}

async function cargarHojasClinicas(pagina,res){
    const historiaClinica = await HistoriaClinica.findById(res.locals.user.idHistoriaClinica);
    let hojasClinicasBD =  historiaClinica.hojasClinicas.reverse();

    // res.locals.hojasClinicas =;
    let hojasClinicasPag = [];
    let numHojasXpagina = 10;
    let numTotalPag = Math.ceil(hojasClinicasBD.length/numHojasXpagina);
    let doctores = [];
    let areas = [];
    const getDoctor=async (idDoctor)=>{
        for(d of doctores){
            if(d._id==idDoctor){
                return d;
            }
        }
        let doctor = (await Doctor.findById(idDoctor)).toObject({virtuals:true});
        doctores.push(doctor)
        return doctor;
    }
    const getArea=async (idArea)=>{
        for(a of areas){
            if(a._id==idArea){
                return a;
            }
        }
        console.log("retorno area");
        let area = (await AreaMedica.findById(idArea)).toObject({virtuals:true});
        areas.push(area)
        return area;
    }
    if(pagina==null || isNaN(pagina) ||pagina<0 || pagina>numTotalPag){
        pagina = 1;
    }
    let indiceIni = numHojasXpagina*(pagina-1);
    for(let i = 0; i < hojasClinicasBD.length; i++){
        if(i>=indiceIni&&i<indiceIni+numHojasXpagina){
            let hoja = hojasClinicasBD[i].toObject();
            hoja.doctor = await getDoctor(hoja.idDoctor);
            hoja.area = await getArea(hoja.idArea);
            hoja.numero = i+1;
            hojasClinicasPag.push(hoja);
        }
    }
   
    res.locals.hojasClinicas = hojasClinicasPag;
    res.locals.numPag = numTotalPag;
    res.locals.actualPag = pagina;

}