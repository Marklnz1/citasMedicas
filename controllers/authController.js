const Paciente = require("../models/Paciente");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");

module.exports.login_post = async (req, res) => {
  const data = req.body;
  const dni = data.dni;
  const password = data.password;
  const tipoUsuario = data.tipoUsuario;
  let usuario = null;
  if (tipoUsuario == "paciente") {
    usuario = await Paciente.findOne({ dni });
  } else {
    usuario = await Doctor.findOne({ dni });
  }

  let mensaje;
  if (usuario) {
    if (usuario.password == password) {
      mensaje = "Te has logeado correctamente";
      const token = crearToken(usuario.dni, tipoUsuario);
      res.cookie("jwt", token, { httpOnly: true, maxAge: tiempoMaximo * 1000 });
    } else {
      mensaje = "contraseña incorrecta";
    }
  } else {
    mensaje = "El dni ingresado no esta regitrado :(";
  }

  res.status(201).json({ mensaje });
};

module.exports.login_get = (req, res, next) => {
    res.render("autenticacion/login");

};
module.exports.logout_get = (req, res,next) => {
  if (res.locals.user.tipoUsuario) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/login");
  } else {
    next();
  }
};
const tiempoMaximo = 30000; //segundos

const crearToken = (id, tipoUsuario) => {
  return jwt.sign({ id, tipoUsuario }, "palabra secreta", {
    expiresIn: tiempoMaximo,
  });
};
