let faker = require("faker");
const Paciente = require('../../models/Paciente');
const Doctor = require('../../models/Doctor');
const AreaMedica = require('../../models/AreaMedica');
const HistoriaClinica = require('../../models/HistoriaClinica');
const Cita = require('../../models/Cita');
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
let areasMedicas = [];
let pacientes = [];
let doctores = [];
module.exports.generarUsuarios = async (req, res) => {
    
  faker.locale = "es";
    await Paciente.remove();
    await Doctor.remove();
    await AreaMedica.remove();
    await HistoriaClinica.remove();
    await Cita.remove();
    areasMedicas = [];
    pacientes = [];
    doctores = [];
    await crearAreasMedicas();
    await crearDoctor(15);
    await crearPaciente(15);
    await crearHorarios();
    await crearCitasMedicas();
  res.status(200).json("usuario creados "+NR(1,0,100));
};
async function crearCitasMedicas(){

    for(const area of areasMedicas){
       
        if(area.horarios.length===0) continue;
        const horario = area.horarios[0];

        const citaCreada = {};
        citaCreada.idAreaMedica = area._id;
        citaCreada.idDoctor = horario.idDoctor;
        citaCreada.idPaciente = pacientes[0]._id;
        citaCreada.fecha = horario.fecha;
        citaCreada.hora = horario.horas[0];
        citaCreada.descripcion = lorem.generateParagraphs(1);
        citaCreada.estado = "pendiente";

        const nuevaCita = new Cita(citaCreada);
        await nuevaCita.save();

        const doctor = doctores.filter(doctor => doctor._id ==citaCreada.idDoctor)[0];
        doctor.citas.push(nuevaCita._id);
        await doctor.save();

        const paciente =  pacientes.filter(paciente => paciente._id ==citaCreada.idPaciente)[0];
        paciente.citas.push(nuevaCita._id);
        await paciente.save();
       
    }

}
async function crearHojasClinicas(){
    for(const area of areasMedicas){
       
        if(area.doctores.length===0) continue;

        const idDoctor = area.doctores[0];
        const idHistoriaClinica = pacientes[0].idh;
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
        // =================================================
        const horario = area.horarios[0];

        const citaCreada = {};
        citaCreada.idAreaMedica = area._id;
        citaCreada.idDoctor = horario.idDoctor;
        citaCreada.idPaciente = pacientes[0]._id;
        citaCreada.fecha = horario.fecha;
        citaCreada.hora = horario.horas[0];
        citaCreada.descripcion = lorem.generateParagraphs(1);
        citaCreada.estado = "pendiente";

        const nuevaCita = new Cita(citaCreada);
        await nuevaCita.save();

        const doctor = doctores.filter(doctor => doctor._id ==citaCreada.idDoctor)[0];
        doctor.citas.push(nuevaCita._id);
        await doctor.save();

        const paciente =  pacientes.filter(paciente => paciente._id ==citaCreada.idPaciente)[0];
        paciente.citas.push(nuevaCita._id);
        await paciente.save();
       
    }
}
async function crearAreasMedicas(){
    let areas = "Odontología,Cardiología,Hematología,Nefrología,Neurocirugía,Oftalmología,Traumatología";
    areas = areas.split(",");

    for(let nombre of areas){
        const nuevoArea = new AreaMedica({nombre});
        areasMedicas.push(nuevoArea);
        nuevoArea.doctoresArea =[];
        await nuevoArea.save();
    }
}
async function crearPaciente(numero=1){
    
    for(let i = 0 ; i < numero;i++){
        let direccion = faker.address.streetAddress();
        let nombre = faker.name.firstName("male")+" "+faker.name.firstName("male");
        let apellido = faker.name.lastName()+" "+faker.name.lastName();
        let dni = NR(8)+"";
        let password = "1234";
        let tipoUsuario = "paciente";
        let telefono = parseInt("9"+NR(8));
        if(i===0){
            dni = "87654321";
            password = "1234";
        }
        const historiaClinica = new HistoriaClinica();
        await historiaClinica.save();
        const nuevoUsuario = new Paciente({nombre,apellido,dni,direccion,telefono,password,tipoUsuario,idHistoriaClinica:historiaClinica._id,estado:"activo"});
        await nuevoUsuario.save();  
        pacientes.push(nuevoUsuario);
    }
   
}
async function crearDoctor(numero=1){
    for(let i = 0; i < numero ; i++){
        let direccion = faker.address.streetAddress();
    let nombre = faker.name.firstName("male")+" "+faker.name.firstName("male");
    let apellido = faker.name.lastName()+" "+faker.name.lastName();
    let dni = NR(8)+"";
    let password = 1234;
    let tipoUsuario = "doctor";
    let telefono = parseInt("9"+NR(8));
    let areaMedica = areasMedicas[NR(1,0,areasMedicas.length-1)];
    let especialidad = areaMedica.nombre;
    if(i===0){
        dni = "12345678";
        password = "1234";
        areaMedica = areasMedicas[0];
        especialidad = areaMedica.nombre;
    }
    const nuevoUsuario = new Doctor({nombre,apellido,dni,direccion,telefono,password,especialidad,tipoUsuario,estado:"libre"});
    await nuevoUsuario.save();

    areaMedica.doctores.push(nuevoUsuario._id);
    areaMedica.doctoresArea.push(nuevoUsuario);
    await areaMedica.save();
    doctores.push(nuevoUsuario);
    }
}
function crearHoras(min,max,abreviatura){
    let horas = [];
    for(let i = min; i <max;i++){
        
        horas.push(i+"-"+(i+1)+" "+abreviatura);
    }
    return horas;
}
async function crearHorarios(){
    const horasTotales = crearHoras(7,11,"am");
    horasTotales.push(...crearHoras(1,11,"pm"));
    horasTotales.push("11-12 pm");
    horasTotales.push("12-1 pm");
    let mitad = parseInt(horasTotales.length/2);

    
    // const idDoctor = data.idDoctor;

    // for(const areaMedica of areasMedicas){
    //     const doctoresArea = [];
    //     for(let idDoctor of areaMedica.doctores){
    //         const doctorEncontrado = doctores.filter(doctor => doctor._id ==idDoctor);
    //         doctoresArea.push(...doctorEncontrado);
    //     }
        
    // }
        for(const areaMedica of areasMedicas){
            for(const doctor of areaMedica.doctoresArea){
                const idDoctor = doctor._id;
                const horas = horasTotales.slice(NR(1,0,mitad),NR(1,mitad+1,horasTotales.length))
                const fecha = faker.date.future();
                areaMedica.horarios.push({idDoctor,fecha,horas,estado:"disponible"});
                await areaMedica.save();
            }
        }
    // const area = await AreaMedica.findById(data.idArea);
    // area.horarios.push({idDoctor,fecha,horas});
    // area.save();
    
    // res.status(200).end();

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
