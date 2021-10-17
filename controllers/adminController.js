const Paciente = require("../models/Paciente");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");

module.exports.registro_get = (req, res, next) => {
  res.render("registro/registro");
};

module.exports.registro_post = async (req, res, next) => {
  const body = req.body;
  const tipoUsuario = body.tipoUsuario;
  let datosUsuario = {
    nombre: body.nombre,
    apellido: body.apellido,
    dni: body.dni,
    email: body.email,
    telefono: body.telefono,
    password: body.password,
    tipoUsuario: body.tipoUsuario,
    estado: "activo",
  };

  datosUsuario.password = await getPasswordBcrypt(datosUsuario.password);

  let nuevoUsuario = null;
  if (tipoUsuario == "paciente") {
    datosUsuario.telefonoFamiliar = body.telefonoFamiliar;
    datosUsuario.direccion = body.direccion;

    nuevoUsuario = new Paciente(datosUsuario);

  } else if (tipoUsuario == "doctor") {
    datosUsuario.yearXp = body.yearXp;
    datosUsuario.especialidad = body.especialidad;

    nuevoUsuario = new Doctor(datosUsuario);
  }

  await nuevoUsuario.save();
  console.log(datosUsuario);
  res.status(201).json({ data: req.body });
};

async function getPasswordBcrypt(password){
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password,salt);
}