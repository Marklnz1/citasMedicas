"use strict";

var Paciente = require("../models/Paciente");

var Doctor = require("../models/Doctor");

var bcrypt = require("bcrypt");

var HistoriaClinica = require("../models/HistoriaClinica");

module.exports.registro_get = function (req, res, next) {
  res.render("registro/registro");
};

module.exports.registro_post = function _callee(req, res, next) {
  var body, tipoUsuario, datosUsuario, nuevoUsuario, historiaClinica;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = req.body;
          tipoUsuario = body.tipoUsuario;
          datosUsuario = {
            nombre: body.nombre,
            apellido: body.apellido,
            dni: body.dni,
            email: body.email,
            telefono: body.telefono,
            password: body.password,
            tipoUsuario: body.tipoUsuario,
            estado: "activo"
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(getPasswordBcrypt(datosUsuario.password));

        case 5:
          datosUsuario.password = _context.sent;
          nuevoUsuario = null;

          if (!(tipoUsuario == "paciente")) {
            _context.next = 17;
            break;
          }

          historiaClinica = new HistoriaClinica();
          _context.next = 11;
          return regeneratorRuntime.awrap(historiaClinica.save());

        case 11:
          datosUsuario.telefonoFamiliar = body.telefonoFamiliar;
          datosUsuario.direccion = body.direccion;
          datosUsuario.idHistoriaClinica = historiaClinica._id;
          nuevoUsuario = new Paciente(datosUsuario);
          _context.next = 18;
          break;

        case 17:
          if (tipoUsuario == "doctor") {
            datosUsuario.yearXp = body.yearXp;
            datosUsuario.especialidad = body.especialidad;
            nuevoUsuario = new Doctor(datosUsuario);
          }

        case 18:
          _context.next = 20;
          return regeneratorRuntime.awrap(nuevoUsuario.save());

        case 20:
          console.log(datosUsuario);
          res.status(201).json({
            data: req.body
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.login_post = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.login_get = function (req, res, next) {
  res.render("Administrador/loginadmin");
};

function getPasswordBcrypt(password) {
  var salt;
  return regeneratorRuntime.async(function getPasswordBcrypt$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 2:
          salt = _context3.sent;
          return _context3.abrupt("return", bcrypt.hash(password, salt));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}