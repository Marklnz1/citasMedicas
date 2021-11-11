"use strict";

var Cita = require('../models/Cita');

var AreaMedica = require("../models/AreaMedica");

var Doctor = require("../models/Doctor");

var Paciente = require('../models/Paciente');

var HistoriaClinica = require("../models/HistoriaClinica");

module.exports.cita_get = function _callee(req, res, next) {
  var citas, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cita;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "paciente")) {
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
          return regeneratorRuntime.awrap(Doctor.findById(cita.idDoctor));

        case 15:
          cita.doctor = _context.sent;
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
          res.render("paciente/vercitaspendientespaciente");
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

module.exports.cita_create_get = function _callee2(req, res, next) {
  var areasMedicasBD, areasMedicas, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _i, _areasMedicas, i;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(res.locals.user.tipoUsuario === "paciente")) {
            _context2.next = 43;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(AreaMedica.find({}));

        case 3:
          areasMedicasBD = _context2.sent;
          areasMedicas = [];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context2.prev = 8;

          for (_iterator2 = areasMedicasBD[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            area = _step2.value;
            areasMedicas.push(area.toObject());
          }

          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](8);
          _didIteratorError2 = true;
          _iteratorError2 = _context2.t0;

        case 16:
          _context2.prev = 16;
          _context2.prev = 17;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 19:
          _context2.prev = 19;

          if (!_didIteratorError2) {
            _context2.next = 22;
            break;
          }

          throw _iteratorError2;

        case 22:
          return _context2.finish(19);

        case 23:
          return _context2.finish(16);

        case 24:
          _i = 0, _areasMedicas = areasMedicas;

        case 25:
          if (!(_i < _areasMedicas.length)) {
            _context2.next = 39;
            break;
          }

          area = _areasMedicas[_i];
          i = 0;

        case 28:
          if (!(i < area.doctores.length)) {
            _context2.next = 36;
            break;
          }

          _context2.next = 31;
          return regeneratorRuntime.awrap(Doctor.findById(area.doctores[i]));

        case 31:
          _context2.t1 = {
            virtuals: true
          };
          area.doctores[i] = _context2.sent.toObject(_context2.t1);

        case 33:
          i++;
          _context2.next = 28;
          break;

        case 36:
          _i++;
          _context2.next = 25;
          break;

        case 39:
          res.locals.areasMedicas = areasMedicas;
          res.render("registro/registroCita");
          _context2.next = 44;
          break;

        case 43:
          next();

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[8, 12, 16, 24], [17,, 19, 23]]);
};

module.exports.cita_create_post = function _callee3(req, res) {
  var datosCita, nuevaCita, doctor, paciente;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          datosCita = req.body;
          datosCita.estado = "disponible";
          nuevaCita = new Cita(datosCita);
          _context3.next = 5;
          return regeneratorRuntime.awrap(nuevaCita.save());

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(Doctor.findById(datosCita.idDoctor));

        case 7:
          doctor = _context3.sent;
          doctor.citas.push(nuevaCita._id);
          doctor.save();
          _context3.next = 12;
          return regeneratorRuntime.awrap(Paciente.findById(datosCita.idPaciente));

        case 12:
          paciente = _context3.sent;
          paciente.citas.push(nuevaCita._id);
          paciente.save();
          res.status(200).end();

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.historia_get = function _callee4(req, res) {
  var pag;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          pag = req.query.pag;
          _context4.next = 3;
          return regeneratorRuntime.awrap(cargarHojasClinicas(pag, res));

        case 3:
          res.render("paciente/historia");

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

function cargarHojasClinicas(pagina, res) {
  var historiaClinica, hojasClinicasBD, hojasClinicasPag, numHojasXpagina, numTotalPag, doctores, areas, getDoctor, getArea, indiceIni, i, hoja;
  return regeneratorRuntime.async(function cargarHojasClinicas$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(HistoriaClinica.findById(res.locals.user.idHistoriaClinica));

        case 2:
          historiaClinica = _context7.sent;
          hojasClinicasBD = historiaClinica.hojasClinicas; // res.locals.hojasClinicas =;

          hojasClinicasPag = [];
          numHojasXpagina = 10;
          numTotalPag = Math.ceil(hojasClinicasBD.length / numHojasXpagina);
          doctores = [];
          areas = [];

          getDoctor = function getDoctor(idDoctor) {
            var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, doctor;

            return regeneratorRuntime.async(function getDoctor$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context5.prev = 3;
                    _iterator3 = doctores[Symbol.iterator]();

                  case 5:
                    if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                      _context5.next = 12;
                      break;
                    }

                    d = _step3.value;

                    if (!(d._id == idDoctor)) {
                      _context5.next = 9;
                      break;
                    }

                    return _context5.abrupt("return", d);

                  case 9:
                    _iteratorNormalCompletion3 = true;
                    _context5.next = 5;
                    break;

                  case 12:
                    _context5.next = 18;
                    break;

                  case 14:
                    _context5.prev = 14;
                    _context5.t0 = _context5["catch"](3);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context5.t0;

                  case 18:
                    _context5.prev = 18;
                    _context5.prev = 19;

                    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                      _iterator3["return"]();
                    }

                  case 21:
                    _context5.prev = 21;

                    if (!_didIteratorError3) {
                      _context5.next = 24;
                      break;
                    }

                    throw _iteratorError3;

                  case 24:
                    return _context5.finish(21);

                  case 25:
                    return _context5.finish(18);

                  case 26:
                    _context5.next = 28;
                    return regeneratorRuntime.awrap(Doctor.findById(idDoctor));

                  case 28:
                    _context5.t1 = {
                      virtuals: true
                    };
                    doctor = _context5.sent.toObject(_context5.t1);
                    doctores.push(doctor);
                    return _context5.abrupt("return", doctor);

                  case 32:
                  case "end":
                    return _context5.stop();
                }
              }
            }, null, null, [[3, 14, 18, 26], [19,, 21, 25]]);
          };

          getArea = function getArea(idArea) {
            var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, area;

            return regeneratorRuntime.async(function getArea$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _iteratorNormalCompletion4 = true;
                    _didIteratorError4 = false;
                    _iteratorError4 = undefined;
                    _context6.prev = 3;
                    _iterator4 = areas[Symbol.iterator]();

                  case 5:
                    if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                      _context6.next = 12;
                      break;
                    }

                    a = _step4.value;

                    if (!(a._id == idArea)) {
                      _context6.next = 9;
                      break;
                    }

                    return _context6.abrupt("return", a);

                  case 9:
                    _iteratorNormalCompletion4 = true;
                    _context6.next = 5;
                    break;

                  case 12:
                    _context6.next = 18;
                    break;

                  case 14:
                    _context6.prev = 14;
                    _context6.t0 = _context6["catch"](3);
                    _didIteratorError4 = true;
                    _iteratorError4 = _context6.t0;

                  case 18:
                    _context6.prev = 18;
                    _context6.prev = 19;

                    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                      _iterator4["return"]();
                    }

                  case 21:
                    _context6.prev = 21;

                    if (!_didIteratorError4) {
                      _context6.next = 24;
                      break;
                    }

                    throw _iteratorError4;

                  case 24:
                    return _context6.finish(21);

                  case 25:
                    return _context6.finish(18);

                  case 26:
                    console.log("retorno area");
                    _context6.next = 29;
                    return regeneratorRuntime.awrap(AreaMedica.findById(idArea));

                  case 29:
                    _context6.t1 = {
                      virtuals: true
                    };
                    area = _context6.sent.toObject(_context6.t1);
                    areas.push(area);
                    return _context6.abrupt("return", area);

                  case 33:
                  case "end":
                    return _context6.stop();
                }
              }
            }, null, null, [[3, 14, 18, 26], [19,, 21, 25]]);
          };

          if (pagina == null || isNaN(pagina) || pagina < 0 || pagina > numTotalPag) {
            pagina = 1;
          }

          indiceIni = numHojasXpagina * (pagina - 1);
          i = 0;

        case 14:
          if (!(i < hojasClinicasBD.length)) {
            _context7.next = 27;
            break;
          }

          if (!(i >= indiceIni && i < indiceIni + numHojasXpagina)) {
            _context7.next = 24;
            break;
          }

          hoja = hojasClinicasBD[i].toObject();
          _context7.next = 19;
          return regeneratorRuntime.awrap(getDoctor(hoja.idDoctor));

        case 19:
          hoja.doctor = _context7.sent;
          _context7.next = 22;
          return regeneratorRuntime.awrap(getArea(hoja.idArea));

        case 22:
          hoja.area = _context7.sent;
          hojasClinicasPag.push(hoja);

        case 24:
          i++;
          _context7.next = 14;
          break;

        case 27:
          res.locals.hojasClinicas = hojasClinicasPag;
          res.locals.numPag = numTotalPag;
          res.locals.actualPag = pagina;

        case 30:
        case "end":
          return _context7.stop();
      }
    }
  });
}