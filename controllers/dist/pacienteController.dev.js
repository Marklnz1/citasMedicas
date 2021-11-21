"use strict";

var Cita = require("../models/Cita");

var AreaMedica = require("../models/AreaMedica");

var Doctor = require("../models/Doctor");

var Paciente = require("../models/Paciente");

var HistoriaClinica = require("../models/HistoriaClinica");

module.exports.cita_get = function _callee(req, res, next) {
  var idCitas, pagina, citasBD, respuesta;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "paciente")) {
            _context.next = 14;
            break;
          }

          idCitas = res.locals.user.citas;
          pagina = req.query.pag;
          _context.next = 5;
          return regeneratorRuntime.awrap(Cita.find().where("_id")["in"](idCitas).populate("doctor").populate("areaMedica").lean().exec());

        case 5:
          citasBD = _context.sent;
          citasBD = citasBD.reverse();
          respuesta = getItemsDePagina(citasBD, pagina, 7);
          res.locals.citas = respuesta.nuevaLista;
          res.locals.numPag = respuesta.numTotalPaginas;
          res.locals.actualPag = respuesta.pagina;
          res.render("paciente/vercitaspendientespaciente");
          _context.next = 15;
          break;

        case 14:
          next();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.cita_create_get = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "paciente")) {
            _context2.next = 7;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(AreaMedica.find().populate("doctores").lean().exec());

        case 3:
          res.locals.areasMedicas = _context2.sent;
          res.render("registro/registroCita");
          _context2.next = 8;
          break;

        case 7:
          next();

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.cita_create_post = function _callee3(req, res) {
  var datosCita, nuevaCita, doctor, paciente;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          datosCita = req.body;
          datosCita.estado = "Pendiente";
          nuevaCita = new Cita(datosCita);
          _context3.next = 5;
          return regeneratorRuntime.awrap(nuevaCita.save());

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(Doctor.findById(datosCita.doctor));

        case 7:
          doctor = _context3.sent;
          doctor.citas.push(nuevaCita._id);
          _context3.next = 11;
          return regeneratorRuntime.awrap(doctor.save());

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(Paciente.findById(datosCita.paciente));

        case 13:
          paciente = _context3.sent;
          paciente.citas.push(nuevaCita._id);
          _context3.next = 17;
          return regeneratorRuntime.awrap(paciente.save());

        case 17:
          res.status(200).end();

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.historia_get = function _callee4(req, res, next) {
  var pagina, historiaClinica, hojasClinicas, resultado, hojasPorPagina, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, h;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "paciente")) {
            _context4.next = 33;
            break;
          }

          pagina = req.query.pag;
          _context4.next = 4;
          return regeneratorRuntime.awrap(HistoriaClinica.findById(res.locals.user.historiaClinica).populate([{
            path: "hojasClinicas.doctor"
          }, {
            path: "hojasClinicas.areaMedica"
          }]).lean().exec());

        case 4:
          historiaClinica = _context4.sent;
          hojasClinicas = historiaClinica.hojasClinicas.reverse();
          resultado = getItemsDePagina(hojasClinicas, pagina, 10);
          hojasPorPagina = resultado.nuevaLista;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 11;

          for (_iterator = hojasPorPagina[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            h = _step.value;
            h.numero = hojasClinicas.indexOf(h) + 1;
          }

          _context4.next = 19;
          break;

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](11);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 19:
          _context4.prev = 19;
          _context4.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context4.prev = 22;

          if (!_didIteratorError) {
            _context4.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context4.finish(22);

        case 26:
          return _context4.finish(19);

        case 27:
          res.locals.hojasClinicas = hojasPorPagina;
          res.locals.numPag = resultado.numTotalPaginas;
          res.locals.actualPag = resultado.pagina;
          res.render("paciente/historia");
          _context4.next = 34;
          break;

        case 33:
          next();

        case 34:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[11, 15, 19, 27], [20,, 22, 26]]);
};

module.exports.cita_cancel_post = function _callee5(req, res) {
  var cita;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Cita.findById(req.body.idCita));

        case 2:
          cita = _context5.sent;
          cita.estado = "Cancelado";
          cita.motivoCancelacion = req.body.motivo;
          _context5.next = 7;
          return regeneratorRuntime.awrap(cita.save());

        case 7:
          res.status(200).end();

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
};

function getItemsDePagina(lista, pagina, itemsPorPagina) {
  var numTotalPaginas = Math.ceil(lista.length / itemsPorPagina);

  if (pagina == null || isNaN(pagina) || pagina <= 0 || pagina > numTotalPaginas) {
    pagina = 1;
  }

  if (numTotalPaginas == 0) numTotalPaginas = 1;
  var posInicial = itemsPorPagina * (pagina - 1);
  var posFinal = posInicial + itemsPorPagina;
  var nuevaLista = [];

  for (var i = 0; i < lista.length; i++) {
    if (i >= posInicial && i < posFinal) {
      nuevaLista.push(lista[i]);
    }
  }

  return {
    nuevaLista: nuevaLista,
    numTotalPaginas: numTotalPaginas,
    pagina: pagina
  };
}