const AreaMedica = require("../models/AreaMedica");
const Cita = require("../models/Cita");
const Doctor = require("../models/Doctor");
const HistoriaClinica = require("../models/HistoriaClinica");
const Paciente = require("../models/Paciente");

const faker = require("faker");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
module.exports.genAreasMedicas = async (req, res, next) => {
    let areas = "Odontología,Cardiología,Hematología,Nefrología,Neurocirugía,Oftalmología,Traumatología";
    areas = areas.split(",");

    for(let nombre of areas){
        const nuevoArea = new AreaMedica({nombre});
        await nuevoArea.save();
    }
    res.status(200).send("areas creadas correctamente");
};
module.exports.genDatosPaciente = async (req,res,next)=>{
    await this.generarDatosPaciente(res.locals.user);
    res.status(200).send("citas y hojas clinicas creadas correctamente");
}






module.exports.generarDatosDoctor = async (doctor)=>{
    const areasMedicas = await AreaMedica.find();
  
    for(let area of areasMedicas){
      let horarios = crearHorarios();
      doctor.areasAtencion.push({areaMedica:area._id,horarios});
      area.doctores.push(doctor._id);
      await area.save();
    }
  
    await doctor.save();
  }
module.exports.generarDatosPaciente = async (pacienteBD)=>{
    let doctoresBD = await Doctor.find();
    await generarCitasPaciente(pacienteBD,doctoresBD);
    await generarHojasClinicasPaciente(pacienteBD,doctoresBD);
}
generarCitasPaciente = async (pacienteBD,doctoresBD)=>{
    let idCitas = [];
    let citas = [];
    let numCitas = 8;

    for(let i = 0; i < numCitas; i++){
        let citaNueva = null;
        let datosCita = {};
        let doctorBD = doctoresBD[NR(1,0,doctoresBD.length-1)];
        datosCita.paciente = pacienteBD._id;
        datosCita.doctor = doctorBD._id;
        datosCita.areaMedica = doctorBD.areasAtencion[NR(1,0,doctorBD.areasAtencion.length-1)].areaMedica;
        datosCita.horarios = crearHorarios(1);
        datosCita.hora =  datosCita.horarios[0].horas[NR(1,0,datosCita.horarios[0].horas.length-1)];
        datosCita.fecha = datosCita.horarios[0].fecha;
        datosCita.descripcion = lorem.generateWords(NR(1,7,15));
        datosCita.estado = "Pendiente";
        citaNueva = await new Cita(datosCita);
        await citaNueva.save();
        doctorBD.citas.push(citaNueva._id);
        await doctorBD.save();
        pacienteBD.citas.push(citaNueva._id);
        await pacienteBD.save();
        // console.log(citaNueva);
    }

}
generarHojasClinicasPaciente = async (pacienteBD,doctoresBD)=>{

  let numHojas = 8;
    let historiaClinica = await HistoriaClinica.findById(pacienteBD.historiaClinica);

    for(let i = 0; i < numHojas; i++){
        let datosHoja = {};
        let doctorBD = doctoresBD[NR(1,0,doctoresBD.length-1)];
        datosHoja.doctor = doctorBD._id;
        datosHoja.areaMedica = doctorBD.areasAtencion[NR(1,0,doctorBD.areasAtencion.length-1)].areaMedica;
        datosHoja.fecha = crearFechaAnterior();
        datosHoja.descripcion = lorem.generateParagraphs(1);
        datosHoja.receta = {};
        datosHoja.receta.medicamentos = lorem.generateParagraphs(1);
        datosHoja.receta.indicaciones = lorem.generateParagraphs(1);
        historiaClinica.hojasClinicas.push(datosHoja);
    }
    await historiaClinica.save();
}
  function crearHorarios(numHorarios = NR(1,3,7)){
    const horarios = [];
    const horasTotales = crearHoras(7,11,"am");
    horasTotales.push(...crearHoras(1,11,"pm"));
    horasTotales.push("11-12 pm");
    horasTotales.push("12-1 pm");
    let mitad = parseInt(horasTotales.length/2);
    
    for(let i = 0; i < numHorarios; i++){
      const horas = horasTotales.slice(NR(1,0,mitad),NR(1,mitad+1,horasTotales.length))
      const fecha = crearFechaFutura();
      horarios.push({fecha,horas,estado:"Disponible"});
    }
    return horarios;
  }
  function crearFechaFutura(){
    return (new Date(faker.date.future() ) ).toLocaleDateString();
  }
  function crearFechaAnterior(){
    return (new Date(faker.date.past() ) ).toLocaleDateString();
  }
  function crearHoras(min,max,abreviatura){
    let horas = [];
    for(let i = min; i <max;i++){
        
        horas.push(i+"-"+(i+1)+" "+abreviatura);
    }
    return horas;
  }
  function NR(repeticiones=1,min=1,max=9) {
    let numeroTexto = "";
    
    for (let i = 0; i < repeticiones; i++) {
      const random = faker.datatype.number({
        min,
        max,
      });
      numeroTexto+=random;
    }
    return parseInt(numeroTexto);
  }
  