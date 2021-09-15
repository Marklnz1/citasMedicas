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
    let usuario = null;
    let tipoUsuario = decodedToken.tipoUsuario;
    let id = decodedToken.id;
    res.locals.user = {tipoUsuario,id};
  }
};


