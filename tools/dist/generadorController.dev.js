"use strict";

var _this = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var AreaMedica = require("../models/AreaMedica");

var Cita = require("../models/Cita");

var Doctor = require("../models/Doctor");

var HistoriaClinica = require("../models/HistoriaClinica");

var Paciente = require("../models/Paciente");

var faker = require("faker");

var LoremIpsum = require("lorem-ipsum").LoremIpsum;

var lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

module.exports.genAreasMedicas = function _callee(req, res, next) {
  var areas, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nombre, nuevoArea;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          areas = "Odontología,Cardiología,Hematología,Nefrología,Neurocirugía,Oftalmología,Traumatología";
          areas = areas.split(",");
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 5;
          _iterator = areas[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 15;
            break;
          }

          nombre = _step.value;
          nuevoArea = new AreaMedica({
            nombre: nombre
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(nuevoArea.save());

        case 12:
          _iteratorNormalCompletion = true;
          _context.next = 7;
          break;

        case 15:
          _context.next = 21;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 21:
          _context.prev = 21;
          _context.prev = 22;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 24:
          _context.prev = 24;

          if (!_didIteratorError) {
            _context.next = 27;
            break;
          }

          throw _iteratorError;

        case 27:
          return _context.finish(24);

        case 28:
          return _context.finish(21);

        case 29:
          res.status(200).send("areas creadas correctamente");

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 17, 21, 29], [22,, 24, 28]]);
};

module.exports.genDatosPaciente = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_this.generarDatosPaciente(res.locals.user));

        case 2:
          res.status(200).send("citas y hojas clinicas creadas correctamente");

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.generarDatosDoctor = function _callee3(doctor) {
  var areasMedicas, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, area, horarios;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(AreaMedica.find());

        case 2:
          areasMedicas = _context3.sent;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 6;
          _iterator2 = areasMedicas[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context3.next = 18;
            break;
          }

          area = _step2.value;
          horarios = crearHorarios();
          doctor.areasAtencion.push({
            areaMedica: area._id,
            horarios: horarios
          });
          area.doctores.push(doctor._id);
          _context3.next = 15;
          return regeneratorRuntime.awrap(area.save());

        case 15:
          _iteratorNormalCompletion2 = true;
          _context3.next = 8;
          break;

        case 18:
          _context3.next = 24;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](6);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 24:
          _context3.prev = 24;
          _context3.prev = 25;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 27:
          _context3.prev = 27;

          if (!_didIteratorError2) {
            _context3.next = 30;
            break;
          }

          throw _iteratorError2;

        case 30:
          return _context3.finish(27);

        case 31:
          return _context3.finish(24);

        case 32:
          _context3.next = 34;
          return regeneratorRuntime.awrap(doctor.save());

        case 34:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[6, 20, 24, 32], [25,, 27, 31]]);
};

module.exports.generarDatosPaciente = function _callee4(pacienteBD) {
  var doctoresBD;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Doctor.find());

        case 2:
          doctoresBD = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(generarCitasPaciente(pacienteBD, doctoresBD));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(generarHojasClinicasPaciente(pacienteBD, doctoresBD));

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

generarCitasPaciente = function generarCitasPaciente(pacienteBD, doctoresBD) {
  var idCitas, citas, numCitas, i, citaNueva, datosCita, doctorBD;
  return regeneratorRuntime.async(function generarCitasPaciente$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          idCitas = [];
          citas = [];
          numCitas = 8;
          i = 0;

        case 4:
          if (!(i < numCitas)) {
            _context5.next = 30;
            break;
          }

          citaNueva = null;
          datosCita = {};
          doctorBD = doctoresBD[NR(1, 0, doctoresBD.length - 1)];
          datosCita.paciente = pacienteBD._id;
          datosCita.doctor = doctorBD._id;
          datosCita.areaMedica = doctorBD.areasAtencion[NR(1, 0, doctorBD.areasAtencion.length - 1)].areaMedica;
          datosCita.horarios = crearHorarios(1);
          datosCita.hora = datosCita.horarios[0].horas[NR(1, 0, datosCita.horarios[0].horas.length - 1)];
          datosCita.fecha = datosCita.horarios[0].fecha;
          datosCita.descripcion = lorem.generateWords(NR(1, 7, 15));
          datosCita.estado = "Pendiente";
          _context5.next = 18;
          return regeneratorRuntime.awrap(new Cita(datosCita));

        case 18:
          citaNueva = _context5.sent;
          _context5.next = 21;
          return regeneratorRuntime.awrap(citaNueva.save());

        case 21:
          doctorBD.citas.push(citaNueva._id);
          _context5.next = 24;
          return regeneratorRuntime.awrap(doctorBD.save());

        case 24:
          pacienteBD.citas.push(citaNueva._id);
          _context5.next = 27;
          return regeneratorRuntime.awrap(pacienteBD.save());

        case 27:
          i++;
          _context5.next = 4;
          break;

        case 30:
        case "end":
          return _context5.stop();
      }
    }
  });
};

generarHojasClinicasPaciente = function generarHojasClinicasPaciente(pacienteBD, doctoresBD) {
  var numHojas, historiaClinica, i, datosHoja, doctorBD;
  return regeneratorRuntime.async(function generarHojasClinicasPaciente$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          numHojas = 8;
          _context6.next = 3;
          return regeneratorRuntime.awrap(HistoriaClinica.findById(pacienteBD.historiaClinica));

        case 3:
          historiaClinica = _context6.sent;

          for (i = 0; i < numHojas; i++) {
            datosHoja = {};
            doctorBD = doctoresBD[NR(1, 0, doctoresBD.length - 1)];
            datosHoja.doctor = doctorBD._id;
            datosHoja.areaMedica = doctorBD.areasAtencion[NR(1, 0, doctorBD.areasAtencion.length - 1)].areaMedica;
            datosHoja.fecha = crearFechaAnterior();
            datosHoja.descripcion = lorem.generateParagraphs(1);
            datosHoja.receta = {};
            datosHoja.receta.medicamentos = lorem.generateParagraphs(1);
            datosHoja.receta.indicaciones = lorem.generateParagraphs(1);
            historiaClinica.hojasClinicas.push(datosHoja);
          }

          _context6.next = 7;
          return regeneratorRuntime.awrap(historiaClinica.save());

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
};

function crearHorarios() {
  var numHorarios = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NR(1, 3, 7);
  var horarios = [];
  var horasTotales = crearHoras(7, 11, "am");
  horasTotales.push.apply(horasTotales, _toConsumableArray(crearHoras(1, 11, "pm")));
  horasTotales.push("11-12 pm");
  horasTotales.push("12-1 pm");
  var mitad = parseInt(horasTotales.length / 2);

  for (var i = 0; i < numHorarios; i++) {
    var horas = horasTotales.slice(NR(1, 0, mitad), NR(1, mitad + 1, horasTotales.length));
    var fecha = crearFechaFutura();
    horarios.push({
      fecha: fecha,
      horas: horas,
      estado: "Disponible"
    });
  }

  return horarios;
}

function crearFechaFutura() {
  return new Date(faker.date.future()).toLocaleDateString();
}

function crearFechaAnterior() {
  return new Date(faker.date.past()).toLocaleDateString();
}

function crearHoras(min, max, abreviatura) {
  var horas = [];

  for (var i = min; i < max; i++) {
    horas.push(i + "-" + (i + 1) + " " + abreviatura);
  }

  return horas;
}

function NR() {
  var repeticiones = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9;
  var numeroTexto = "";

  for (var i = 0; i < repeticiones; i++) {
    var random = faker.datatype.number({
      min: min,
      max: max
    });
    numeroTexto += random;
  }

  return parseInt(numeroTexto);
}