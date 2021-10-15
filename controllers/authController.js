const Paciente = require("../models/Paciente");
const Doctor = require("../models/Doctor");
const Cita = require("../models/Cita");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.login_post = async (req, res) => {
  const dni = req.body.dni;
  const password = req.body.password;
  const tipoUsuario = req.body.tipoUsuario;

  const passwordBD = await getPasswordBD(tipoUsuario,dni);
  let mensaje ="DNI no registrado o contraseña incorrecta";

  if(passwordBD){
    const logeado = await bcrypt.compare(password,passwordBD);

    if(logeado){
      const token = crearToken(dni, tipoUsuario);
      res.cookie("jwt", token, { httpOnly: true, maxAge: tiempoMaximo * 1000 }); 
      mensaje= "";
    }
  }
  res.status(201).json({ mensaje });
};

module.exports.login_get = (req, res, next) => {
    res.render("autenticacion/login");
};

const tiempoMaximo = 30000; //segundos

const crearToken = (id, tipoUsuario) => {
  return jwt.sign({ id, tipoUsuario }, "efe", {
    expiresIn: tiempoMaximo,
  });
};

async function getPasswordBD(tipo,dni){
  let usuario = null;
  if(tipo=="doctor"){
    usuario = await Doctor.findOne({dni});
  }else if(tipo == "paciente"){
    usuario = await Paciente.findOne({dni});
  }
  if(usuario==null) return null;

  return usuario.password;
}

module.exports.info_post = async (req, res) => {
 
 
};

module.exports.info_get = (req, res, next) => {
  
    res.render("doctor/informacion");
};

module.exports.infopaciente_post = async (req, res) => {
 
 
};

module.exports.infopaciente_get = (req, res, next) => {
  
    res.render("paciente/informacionpaciente");
};

module.exports.citapaciente_post = async (req, res) => {
 
 
};

module.exports.citapaciente_get = (req, res, next) => {
  
    res.render("paciente/citapaciente");
};
module.exports.citadoctor_post = async (req, res) => {
 
 
};


module.exports.citapendientepaciente_post = async (req, res) => {
 
 
};

module.exports.citapendientepaciente_get = (req, res, next) => {
  
    res.render("paciente/vercitaspendientespaciente");
};

module.exports.citadoctor_get = (req, res, next) => {
  
    res.render("doctor/citadoctor");

};
module.exports.citadoctor_post = async (req, res) => {
 
 
};

module.exports.citapendientedoctor_post = async (req, res) => {
 
 
};

module.exports.citapendientedoctor_get = (req, res, next) => {
  
    res.render("doctor/vercitaspendientesdoctor");
};
