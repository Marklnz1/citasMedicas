"use strict";

var jwt = require("jsonwebtoken");

var Paciente = require("../models/Paciente");

var Doctor = require("../models/Doctor");

module.exports = function _callee(req, res, next) {
  var token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.jwt;
          _context.next = 3;
          return regeneratorRuntime.awrap(extraerUsuario(res, token));

        case 3:
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var extraerUsuario = function extraerUsuario(res, token) {
  var decodedToken, tipoUsuario, id, usuario;
  return regeneratorRuntime.async(function extraerUsuario$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.locals.user = null;

          if (!token) {
            _context2.next = 24;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(token, "efe"));

        case 4:
          decodedToken = _context2.sent;
          tipoUsuario = decodedToken.tipoUsuario;
          id = decodedToken.id;
          usuario = null;

          if (!(tipoUsuario == "doctor")) {
            _context2.next = 14;
            break;
          }

          _context2.next = 11;
          return regeneratorRuntime.awrap(Doctor.findOne({
            dni: id
          }));

        case 11:
          usuario = _context2.sent;
          _context2.next = 21;
          break;

        case 14:
          if (!(tipoUsuario == "paciente")) {
            _context2.next = 20;
            break;
          }

          _context2.next = 17;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: id
          }));

        case 17:
          usuario = _context2.sent;
          _context2.next = 21;
          break;

        case 20:
          usuario = {
            id: id,
            tipoUsuario: tipoUsuario
          };

        case 21:
          res.locals.user = usuario;
          _context2.next = 25;
          break;

        case 24:
          res.locals.user = {};

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  });
};