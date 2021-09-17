const Paciente = require("../models/Paciente");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");


module.exports.login_post = async (req, res) => {
  const dni = req.body.dni;
  const password = req.body.password;
  const tipoUsuario = req.body.tipoUsuario;

  const passwordBD = getPasswordBD(tipoUsuario,dni);
  let mensaje ="DNI no registrado o contraseña incorrecta";

  if(passwordBD){
    if(password == passwordBD){
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
//======================================================================
const tiempoMaximo = 30000; //segundos

const crearToken = (id, tipoUsuario) => {
  return jwt.sign({ id, tipoUsuario }, "efe", {
    expiresIn: tiempoMaximo,
  });
};

function getPasswordBD(tipo,dni){
  if(dni=="12345678") return "1234";
  return null;
}

module.exports.info_post = async (req, res) => {
 
 
};

module.exports.info_get = (req, res, next) => {
  
    res.render("doctor/informacion");
};
