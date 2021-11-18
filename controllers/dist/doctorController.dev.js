"use strict";

var HistoriaClinica = require("../models/HistoriaClinica");

var Paciente = require("../models/Paciente");

var AreaMedica = require("../models/AreaMedica");

var Cita = require("../models/Cita");

var Doctor = require("../models/Doctor");

module.exports.cita_get = function _callee(req, res, next) {
  var citas, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cita;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "doctor")) {
            _context.next = 41;
            break;
          }

          citas = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 5;
          _iterator = res.locals.user.citas[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 23;
            break;
          }

          idCita = _step.value;
          _context.next = 11;
          return regeneratorRuntime.awrap(Cita.findById(idCita));

        case 11:
          _context.t0 = {
            virtuals: true
          };
          cita = _context.sent.toObject(_context.t0);
          _context.next = 15;
          return regeneratorRuntime.awrap(Paciente.findById(cita.idPaciente));

        case 15:
          cita.paciente = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(AreaMedica.findById(cita.idAreaMedica));

        case 18:
          cita.areaMedica = _context.sent;
          citas.push(cita);

        case 20:
          _iteratorNormalCompletion = true;
          _context.next = 7;
          break;

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t1 = _context["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 29:
          _context.prev = 29;
          _context.prev = 30;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 32:
          _context.prev = 32;

          if (!_didIteratorError) {
            _context.next = 35;
            break;
          }

          throw _iteratorError;

        case 35:
          return _context.finish(32);

        case 36:
          return _context.finish(29);

        case 37:
          res.locals.citas = citas;
          res.render("doctor/vercitaspendientesdoctor");
          _context.next = 42;
          break;

        case 41:
          next();

        case 42:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 25, 29, 37], [30,, 32, 36]]);
};

module.exports.historia_create_get = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "doctor")) {
            _context2.next = 10;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: req.params.dniPaciente
          }));

        case 3:
          res.locals.paciente = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(AreaMedica.find());

        case 6:
          res.locals.areasMedicas = _context2.sent;
          res.render("doctor/historia/create");
          _context2.next = 11;
          break;

        case 10:
          next();

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.historia_create_post = function _callee3(req, res) {
  var datosHojaClinica, paciente, idHistoriaPaciente, historiaPaciente;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          datosHojaClinica = req.body;
          datosHojaClinica.idDoctor = res.locals.user._id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: req.body.dniPaciente
          }));

        case 4:
          paciente = _context3.sent;
          idHistoriaPaciente = paciente.idHistoriaClinica;
          _context3.next = 8;
          return regeneratorRuntime.awrap(HistoriaClinica.findOne({
            _id: idHistoriaPaciente
          }));

        case 8:
          historiaPaciente = _context3.sent;
          historiaPaciente.hojasClinicas.push(datosHojaClinica);
          _context3.next = 12;
          return regeneratorRuntime.awrap(historiaPaciente.save());

        case 12:
          res.status(201).json(req.body);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.historia_all_get = function _callee4(req, res, next) {
  var pacientesBD, pacientes, pagina, tipoBusqueda, datoBusqueda, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, p, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "doctor")) {
            _context4.next = 68;
            break;
          }

          _context4.next = 3;
          return regeneratorRuntime.awrap(Paciente.find({}).lean());

        case 3:
          pacientesBD = _context4.sent;
          pacientes = [];
          pagina = req.query.pag;
          tipoBusqueda = req.query.tipoBusqueda;
          datoBusqueda = req.query.datoBusqueda;
          if (tipoBusqueda == null) tipoBusqueda = "";
          if (datoBusqueda == null) datoBusqueda = "";
          tipoBusqueda = tipoBusqueda.toLowerCase();
          res.locals.tipoBusqueda = tipoBusqueda;
          res.locals.datoBusqueda = datoBusqueda;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context4.prev = 16;

          for (_iterator2 = pacientesBD[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            p = _step2.value;
            p.nombreCompleto = p.nombre + " " + p.apellido;
          }

          _context4.next = 24;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](16);
          _didIteratorError2 = true;
          _iteratorError2 = _context4.t0;

        case 24:
          _context4.prev = 24;
          _context4.prev = 25;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 27:
          _context4.prev = 27;

          if (!_didIteratorError2) {
            _context4.next = 30;
            break;
          }

          throw _iteratorError2;

        case 30:
          return _context4.finish(27);

        case 31:
          return _context4.finish(24);

        case 32:
          if (!(!esTipoBusquedaValido(tipoBusqueda) || datoBusqueda.trim() == "")) {
            _context4.next = 36;
            break;
          }

          pacientes = pacientesBD;
          _context4.next = 63;
          break;

        case 36:
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context4.prev = 39;
          _iterator3 = pacientesBD[Symbol.iterator]();

        case 41:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context4.next = 49;
            break;
          }

          pBD = _step3.value;

          if (esPacienteValido(pBD, tipoBusqueda, datoBusqueda)) {
            _context4.next = 45;
            break;
          }

          return _context4.abrupt("continue", 46);

        case 45:
          pacientes.push(pBD);

        case 46:
          _iteratorNormalCompletion3 = true;
          _context4.next = 41;
          break;

        case 49:
          _context4.next = 55;
          break;

        case 51:
          _context4.prev = 51;
          _context4.t1 = _context4["catch"](39);
          _didIteratorError3 = true;
          _iteratorError3 = _context4.t1;

        case 55:
          _context4.prev = 55;
          _context4.prev = 56;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 58:
          _context4.prev = 58;

          if (!_didIteratorError3) {
            _context4.next = 61;
            break;
          }

          throw _iteratorError3;

        case 61:
          return _context4.finish(58);

        case 62:
          return _context4.finish(55);

        case 63:
          cargarPacientes(res, pagina, pacientes);
          console.log(res.locals.pacientes);
          res.render("doctor/busquedahistoriaclinica");
          _context4.next = 69;
          break;

        case 68:
          next();

        case 69:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[16, 20, 24, 32], [25,, 27, 31], [39, 51, 55, 63], [56,, 58, 62]]);
};

function esTipoBusquedaValido(tipoBusqueda) {
  return tipoBusqueda == "dni" || tipoBusqueda == "nombre";
}

function esPacienteValido(paciente, tipoBusqueda, datoBusqueda) {
  if (tipoBusqueda == "nombre") {
    return contienePalabra(datoBusqueda, paciente.nombre + " " + paciente.apellido);
  } else if (tipoBusqueda == "dni") {
    if (paciente.dni == datoBusqueda) return true;
  }
}

function contienePalabra(pedazoTexto, texto) {
  texto = texto.toLowerCase().trim();
  pedazoTexto = " " + pedazoTexto.toLowerCase();
  var palabras = texto.split(" ");
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = palabras[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var p = _step4.value;
      p = " " + p;
      if (p.split(pedazoTexto).length == 2) return true;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return false;
}

function cargarPacientes(res, pagina, pacientesBD) {
  var pacientesPag = [];
  var numPacientesXpagina = 10;
  var numTotalPag = Math.ceil(pacientesBD.length / numPacientesXpagina);
  if (numTotalPag == 0) numTotalPag = 1;

  if (pagina == null || isNaN(pagina) || pagina < 0 || pagina > numTotalPag) {
    pagina = 1;
  }

  var indiceIni = numPacientesXpagina * (pagina - 1);

  for (var i = 0; i < pacientesBD.length; i++) {
    if (i >= indiceIni && i < indiceIni + numPacientesXpagina) {
      pacientesPag.push(pacientesBD[i]);
    }
  }

  res.locals.pacientes = pacientesPag;
  res.locals.numPag = numTotalPag;
  res.locals.actualPag = pagina;
}