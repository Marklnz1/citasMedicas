const Paciente = require("../../models/Paciente");
const HistoriaClinica = require("../../models/HistoriaClinica");
const AreaMedica = require("../../models/AreaMedica");
const Cita = require("../../models/Cita");
const Doctor = require("../../models/Doctor");

module.exports.registro_paciente_post = async (req, res) => {
    const historiaClinica = new HistoriaClinica();
    await historiaClinica.save();
  
    const data = req.body;
    const nombre = data.nombre;
    const apellido = data.apellido;
    const dni = data.dni;
    const direccion = data.direccion;
    const telefono = data.telefono;
    const password = data.password;
    const tipoUsuario = data.tipoUsuario;
    const nuevoUsuario = new Paciente({
      nombre,
      apellido,
      dni,
      direccion,
      telefono,
      password,
      tipoUsuario,
      historiaClinica: historiaClinica._id,
      estado: "activo",
    });
    await nuevoUsuario.save();
  
    console.log(req.body);
    res.status(201).json({ data: req.body });
  };
  module.exports.registro_doctor_post = async (req, res) => {
    const data = req.body;
    const nombre = data.nombre;
    const apellido = data.apellido;
    const dni = data.dni;
    const direccion = data.direccion;
    const telefono = data.telefono;
    const especialidad = data.especialidad;
    const password = data.password;
    const tipoUsuario = data.tipoUsuario;
    const nuevoUsuario = new Doctor({
      nombre,
      apellido,
      dni,
      direccion,
      telefono,
      password,
      especialidad,
      tipoUsuario,
      estado: "libre",
    });
    await nuevoUsuario.save();
  
    const area = await AreaMedica.findById(data.idArea);
    area.doctores.push(nuevoUsuario._id);
    area.save();
    // console.log(req.body);
    res.status(201).json({ data: req.body });
  };
  module.exports.registro_area_get = (req, res) => {
    res.render("registro/registro_area");
  };
  module.exports.registro_area_post = async (req, res) => {
    const nuevaAreaMedica = new AreaMedica({ nombre: req.body.nombre });
    await nuevaAreaMedica.save();
    res.status(201).json({ mensaje: "area registrada correctamente" });
  };
  
  module.exports.registro_cita_get = async (req, res) => {
    res.locals.areasMedicas = await AreaMedica.find({});
    res.locals.doctores = await Doctor.find({});
    res.locals.pacientes = await Paciente.find({});
  
    res.render("registro/registro_cita");
  };
  module.exports.registro_cita_post = async (req, res) => {
    const data = req.body;
  
    const nombreAreaMedica = data.nombreAreaMedica;
    const idDoctor = data.idDoctor;
    const idPaciente = data.idPaciente;
    const fecha = data.fecha;
    const descripcion = data.descripcion;
    const nuevaCita = new Cita({
      nombreAreaMedica,
      idDoctor,
      idPaciente,
      fecha,
      descripcion,
      estado: "pendiente",
    });
    await nuevaCita.save();
  
    const doctor = await Doctor.findById(idDoctor);
    doctor.citas.push(nuevaCita._id);
    doctor.save();
  
    const paciente = await Paciente.findById(idPaciente);
    paciente.citas.push(nuevaCita._id);
    paciente.save();
    res.status(201).json({ mensaje: "cita registrada correctamente" });
  };
  module.exports.registro_paciente_get = (req, res) => {
    res.render("registro/registro_paciente");
  };
  module.exports.registro_doctor_get = async (req, res) => {
    const areas = await AreaMedica.find();
  
    // for(const area of areas){
    //     for(const horario of area.horarios){
    //         const doctor = await Doctor.findById(horario.idDoctor);
    //         horario.doctor= doctor.toObject({virtuals:true});
    //     }
    // }
    res.locals.areas = areas;
  
    res.render("registro/registro_doctor");
  };
  module.exports.registro_horario_post = async (req, res) => {
    const data = req.body;
  
    const horas = data.horas;
    const fecha = data.fecha;
    const idDoctor = data.idDoctor;
  
    const area = await AreaMedica.findById(data.idArea);
    area.horarios.push({ idDoctor, fecha, horas });
    area.save();
  
    res.status(200).end();
  };
  module.exports.registro_horario_get = async (req, res) => {
    const areasBD = await AreaMedica.find();
    const areas = [];
  
    for (const areaBD of areasBD) {
      const area = areaBD.toObject({ virtuals: true });
      const doctores = [];
  
      for (const idDoctor of area.doctores) {
        const doctorBD = await Doctor.findById(idDoctor);
        const doctor = doctorBD.toObject({ virtuals: true });
        doctores.push(doctor);
      }
      area.doctores = doctores;
      areas.push(area);
    }
    res.locals.areas = areas;
  
    res.render("registro/registro_horario");
  };