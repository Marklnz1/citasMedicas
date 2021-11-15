const HistoriaClinica = require("../models/HistoriaClinica");
const Paciente = require("../models/Paciente");
const AreaMedica = require("../models/AreaMedica");
const Cita = require("../models/Cita");
const Doctor = require("../models/Doctor");
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

module.exports.historia_all_get = async(req,res,next)=>{
    if (res.locals.user.tipoUsuario === "doctor") {
    const pacientesBD =await Paciente.find({}).lean();
    let pacientes  = [];
    let pagina = req.query.pag;
    let tipoBusqueda = req.query.tipoBusqueda;
    let datoBusqueda = req.query.datoBusqueda;
    if(tipoBusqueda==null) tipoBusqueda = "";
    if(datoBusqueda==null) datoBusqueda= "";
    tipoBusqueda = tipoBusqueda.toLowerCase();

    res.locals.tipoBusqueda = tipoBusqueda;
    res.locals.datoBusqueda = datoBusqueda;
    for(let p of pacientesBD){
        p.nombreCompleto  = p.nombre+" "+p.apellido;
    }
    if(!esTipoBusquedaValido(tipoBusqueda)||datoBusqueda.trim()==""){
        pacientes = pacientesBD;
    }else{
        for(pBD of pacientesBD){
            if(!esPacienteValido(pBD,tipoBusqueda,datoBusqueda)) continue;
            pacientes.push(pBD);
        }
    }
    cargarPacientes(res,pagina,pacientes);
    console.log(res.locals.pacientes);
    res.render("doctor/busquedahistoriaclinica");
}else{
    next();
}
}
function esTipoBusquedaValido(tipoBusqueda){
    return tipoBusqueda=="dni"||tipoBusqueda=="nombre";
}
function esPacienteValido(paciente,tipoBusqueda,datoBusqueda){
    if(tipoBusqueda=="nombre"){
        return contienePalabra(datoBusqueda,paciente.nombre+" "+paciente.apellido);
    }else if(tipoBusqueda=="dni"){
        if(paciente.dni==datoBusqueda) return true;
    }
       
}
function contienePalabra(pedazoTexto,texto){
  
    texto = texto.toLowerCase().trim();
    pedazoTexto = " "+pedazoTexto.toLowerCase();
    let palabras =   texto.split(" ");
    for(let p of palabras){
      p = " "+p;
      if(p.split(pedazoTexto).length ==2) return true;
    }
    return false;
  }

  function cargarPacientes(res,pagina,pacientesBD){
    let pacientesPag = [];
    let numPacientesXpagina = 10;
    let numTotalPag = Math.ceil(pacientesBD.length/numPacientesXpagina);
    if(numTotalPag==0) numTotalPag = 1;
    if(pagina==null || isNaN(pagina) ||pagina<0 || pagina>numTotalPag){
        pagina = 1;
    }
    

    let indiceIni = numPacientesXpagina*(pagina-1);
    for(let i = 0; i < pacientesBD.length; i++){
        if(i>=indiceIni&&i<indiceIni+numPacientesXpagina){
            pacientesPag.push(pacientesBD[i]);
        }
    }
   
    res.locals.pacientes = pacientesPag;
    res.locals.numPag = numTotalPag;
    res.locals.actualPag = pagina;
    
  }