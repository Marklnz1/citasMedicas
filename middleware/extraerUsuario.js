const jwt = require("jsonwebtoken");
const Paciente = require("../models/Paciente");
const Doctor = require("../models/Doctor");


module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  await extraerUsuario(res, token);
  next();
};

const extraerUsuario = async (res, token) => {
  res.locals.user = null;
  if (token) {
    const decodedToken = await jwt.verify(token, "efe");
    let tipoUsuario = decodedToken.tipoUsuario;
    let id = decodedToken.id;
    let usuario = null;
  if(tipoUsuario=="doctor"){
    usuario = await Doctor.findOne({dni:id});
  }else if(tipoUsuario == "paciente"){
    usuario = await Paciente.findOne({dni:id});
  }else{
    usuario = {id,tipoUsuario};
  }
    res.locals.user = usuario;
  }else{
    res.locals.user = {};
  }
};


