"use strict";

var HistoriaClinica = require("../models/HistoriaClinica");

var Paciente = require("../models/Paciente");

var AreaMedica = require("../models/AreaMedica");

var Cita = require("../models/Cita");

module.exports.cita_get = function _callee(req, res, next) {
  var idcitas, pagina, citasBD, respuesta;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "doctor")) {
            _context.next = 14;
            break;
          }

          idcitas = res.locals.user.citas;
          pagina = req.query.pag;
          _context.next = 5;
          return regeneratorRuntime.awrap(Cita.find().where("_id")["in"](idcitas).populate("paciente").populate("areaMedica").lean().exec());

        case 5:
          citasBD = _context.sent;
          citasBD = citasBD.reverse();
          respuesta = getItemsDePagina(citasBD, pagina, 7);
          res.locals.citas = respuesta.nuevaLista;
          res.locals.numPag = respuesta.numTotalPaginas;
          res.locals.actualPag = respuesta.pagina;
          res.render("doctor/vercitaspendientesdoctor");
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

module.exports.historia_create_get = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "doctor")) {
            _context2.next = 13;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: req.params.dniPaciente
          }).lean());

        case 3:
          res.locals.paciente = _context2.sent;

          if (!(res.locals.paciente == null)) {
            _context2.next = 7;
            break;
          }

          next();
          return _context2.abrupt("return");

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(AreaMedica.find().lean());

        case 9:
          res.locals.areasMedicas = _context2.sent;
          res.render("doctor/historia/create");
          _context2.next = 14;
          break;

        case 13:
          next();

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.historia_create_post = function _callee3(req, res) {
  var datosHojaClinica, paciente, historiaPaciente;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          datosHojaClinica = req.body;
          datosHojaClinica.doctor = res.locals.user._id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: req.body.dniPaciente
          }).lean());

        case 4:
          paciente = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(HistoriaClinica.findById(paciente.historiaClinica));

        case 7:
          historiaPaciente = _context3.sent;
          historiaPaciente.hojasClinicas.push(datosHojaClinica);
          _context3.next = 11;
          return regeneratorRuntime.awrap(historiaPaciente.save());

        case 11:
          res.status(201).json(req.body);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.historia_all_get = function _callee4(req, res, next) {
  var pacientesBD, pacientes, pagina, tipoBusqueda, datoBusqueda, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "doctor")) {
            _context4.next = 48;
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

          if (!(!esTipoBusquedaValido(tipoBusqueda) || datoBusqueda.trim() == "")) {
            _context4.next = 17;
            break;
          }

          pacientes = pacientesBD;
          _context4.next = 44;
          break;

        case 17:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 20;
          _iterator = pacientesBD[Symbol.iterator]();

        case 22:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 30;
            break;
          }

          pBD = _step.value;

          if (esPacienteValido(pBD, tipoBusqueda, datoBusqueda)) {
            _context4.next = 26;
            break;
          }

          return _context4.abrupt("continue", 27);

        case 26:
          pacientes.push(pBD);

        case 27:
          _iteratorNormalCompletion = true;
          _context4.next = 22;
          break;

        case 30:
          _context4.next = 36;
          break;

        case 32:
          _context4.prev = 32;
          _context4.t0 = _context4["catch"](20);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 36:
          _context4.prev = 36;
          _context4.prev = 37;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 39:
          _context4.prev = 39;

          if (!_didIteratorError) {
            _context4.next = 42;
            break;
          }

          throw _iteratorError;

        case 42:
          return _context4.finish(39);

        case 43:
          return _context4.finish(36);

        case 44:
          cargarPacientes(res.locals, pagina, pacientes);
          res.render("doctor/busquedahistoriaclinica");
          _context4.next = 49;
          break;

        case 48:
          next();

        case 49:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[20, 32, 36, 44], [37,, 39, 43]]);
};

function cargarPacientes(locals, pagina, pacientesBD) {
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

  var respuesta = getItemsDePagina(pacientesBD, pagina, 10);
  locals.pacientes = respuesta.nuevaLista;
  locals.numPag = respuesta.numTotalPaginas;
  locals.actualPag = respuesta.pagina;
}

function esPacienteValido(paciente, tipoBusqueda, datoBusqueda) {
  if (tipoBusqueda == "nombre") {
    return contienePalabra(datoBusqueda, paciente.nombre + " " + paciente.apellido);
  } else if (tipoBusqueda == "dni") {
    if (paciente.dni == datoBusqueda) return true;
  }
}

function esTipoBusquedaValido(tipoBusqueda) {
  return tipoBusqueda == "dni" || tipoBusqueda == "nombre";
}

function contienePalabra(pedazoTexto, texto) {
  texto = texto.toLowerCase().trim();
  pedazoTexto = " " + pedazoTexto.toLowerCase();
  var palabras = texto.split(" ");
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = palabras[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var p = _step2.value;
      p = " " + p;
      if (p.split(pedazoTexto).length == 2) return true;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}

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