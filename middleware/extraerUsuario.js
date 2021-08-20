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
    const decodedToken = await jwt.verify(token, "palabra secreta");
    let usuario = null;
    if(decodedToken.tipoUsuario==="paciente"){
      usuario = await Paciente.findOne({ dni: decodedToken.id });
    }else{
      usuario = await Doctor.findOne({ dni: decodedToken.id });
    }
    res.locals.user = usuario; 
  }else{
    res.locals.user = {};
  }
};


