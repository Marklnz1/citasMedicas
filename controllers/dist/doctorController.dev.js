"use strict";

var HistoriaClinica = require("../models/HistoriaClinica");

var Paciente = require("../models/Paciente");

var AreaMedica = require("../models/AreaMedica");

var Cita = require("../models/Cita");

module.exports.cita_get = function _callee(req, res, next) {
  var idcitas, _pagina, citasBD, respuesta;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "doctor")) {
            _context.next = 14;
            break;
          }

          idcitas = res.locals.user.citas;
          _pagina = req.query.pag;
          _context.next = 5;
          return regeneratorRuntime.awrap(Cita.find().where("_id")["in"](idcitas).populate("paciente").populate("areaMedica").lean().exec());

        case 5:
          citasBD = _context.sent;
          citasBD = citasBD.reverse();
          respuesta = getItemsDePagina(citasBD, _pagina, 7);
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
  var pacientesBD, pacientes, _pagina2, tipoBusqueda, datoBusqueda, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step;

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
          _pagina2 = req.query.pag;
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
          cargarPacientes(res.locals, _pagina2, pacientes);
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

module.exports.historia_get = function _callee5(req, res, next) {
  var dniPaciente, paciente, historiaClinica, hojasClinicas, resultado, hojasPorPagina, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, h;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          dniPaciente = req.body.dniPaciente;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: dniPaciente
          }));

        case 3:
          paciente = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(HistoriaClinica.findById(paciente.historiaClinica).populate([{
            path: "hojasClinicas.doctor"
          }, {
            path: "hojasClinicas.areaMedica"
          }]).lean().exec());

        case 6:
          historiaClinica = _context5.sent;
          hojasClinicas = historiaClinica.hojasClinicas.reverse();
          resultado = getItemsDePagina(hojasClinicas, pagina, 10);
          hojasPorPagina = resultado.nuevaLista;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context5.prev = 13;

          for (_iterator2 = hojasPorPagina[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            h = _step2.value;
            h.numero = hojasClinicas.indexOf(h) + 1;
          }

          _context5.next = 21;
          break;

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](13);
          _didIteratorError2 = true;
          _iteratorError2 = _context5.t0;

        case 21:
          _context5.prev = 21;
          _context5.prev = 22;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 24:
          _context5.prev = 24;

          if (!_didIteratorError2) {
            _context5.next = 27;
            break;
          }

          throw _iteratorError2;

        case 27:
          return _context5.finish(24);

        case 28:
          return _context5.finish(21);

        case 29:
          res.locals.hojasClinicas = hojasPorPagina;
          res.locals.numPag = resultado.numTotalPaginas;
          res.locals.actualPag = resultado.pagina;
          res.render("doctor/listahojaclinicaparadoctor");

        case 33:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[13, 17, 21, 29], [22,, 24, 28]]);
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
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = palabras[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var p = _step3.value;
      p = " " + p;
      if (p.split(pedazoTexto).length == 2) return true;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
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