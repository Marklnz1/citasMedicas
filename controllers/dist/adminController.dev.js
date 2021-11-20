"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Paciente = require("../models/Paciente");

var Doctor = require("../models/Doctor");

var bcrypt = require("bcrypt");

var HistoriaClinica = require("../models/HistoriaClinica");

var Admin = require("../models/Admin");

var fetch = function fetch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('node-fetch'));
  }).then(function (_ref) {
    var fetch = _ref["default"];
    return fetch.apply(void 0, args);
  });
};

var generadorController = require("../tools/generadorController");

module.exports.registro_get = function (req, res, next) {
  res.render("registro/registro");
};

module.exports.login_get = function (req, res, next) {
  res.render("autenticacion/login");
};

module.exports.login_post = function _callee(req, res) {
  var usuario, password, tipoUsuario, passwordBD, mensaje, logeado, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          usuario = req.body.usuario;
          password = req.body.password;
          tipoUsuario = req.body.tipoUsuario;
          _context.next = 5;
          return regeneratorRuntime.awrap(Admin.find());

        case 5:
          passwordBD = _context.sent[0].password;
          // const passwordBD = await getPasswordBD(tipoUsuario,dni);
          mensaje = "DNI no registrado o contraseña incorrecta";

          if (passwordBD) {
            logeado = password == passwordBD;

            if (logeado) {
              token = crearToken(usuario, tipoUsuario);
              res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: tiempoMaximo * 1000
              });
              mensaje = "";
            }
          }

          res.status(201).json({
            mensaje: mensaje
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.dni_valido_post = function _callee2(req, res, next) {
  var dni, tipoUsuario, usuario, usuarioBD;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dni = req.body.dni;
          tipoUsuario = req.body.tipoUsuario;
          usuario = null;
          usuarioBD = null;

          if (!(tipoUsuario == "paciente")) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: dni
          }));

        case 7:
          usuarioBD = _context2.sent;
          _context2.next = 18;
          break;

        case 10:
          if (!(tipoUsuario == "doctor")) {
            _context2.next = 16;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(Doctor.findOne({
            dni: dni
          }));

        case 13:
          usuarioBD = _context2.sent;
          _context2.next = 18;
          break;

        case 16:
          res.status(400).json({
            error: "Tipo de usuario no valido"
          });
          return _context2.abrupt("return");

        case 18:
          if (!(usuarioBD != null)) {
            _context2.next = 21;
            break;
          }

          res.status(400).json({
            error: "El DNI ya ha sido registrado"
          });
          return _context2.abrupt("return");

        case 21:
          _context2.prev = 21;
          _context2.t0 = regeneratorRuntime;
          _context2.next = 25;
          return regeneratorRuntime.awrap(fetch("https://frozen-hollows-68632.herokuapp.com/api/v1/dni/" + dni.trim() + "?token=abcxyz"));

        case 25:
          _context2.t1 = _context2.sent.json();
          _context2.next = 28;
          return _context2.t0.awrap.call(_context2.t0, _context2.t1);

        case 28:
          usuario = _context2.sent;
          _context2.next = 35;
          break;

        case 31:
          _context2.prev = 31;
          _context2.t2 = _context2["catch"](21);
          res.status(400).json({
            error: "El DNI no existe en la RENIEC"
          });
          return _context2.abrupt("return");

        case 35:
          res.status(200).json({
            nombre: usuario.nombres,
            apellido: usuario.apellidoPaterno + " " + usuario.apellidoMaterno
          });

        case 36:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[21, 31]]);
};

module.exports.registro_post = function _callee3(req, res, next) {
  var body, tipoUsuario, dni, datosUsuario, usuarioReniec, usuarioBD, nuevoUsuario, historiaClinica;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          body = req.body;
          tipoUsuario = body.tipoUsuario;
          dni = body.dni;
          datosUsuario = {
            dni: body.dni,
            email: body.email,
            telefono: body.telefono,
            password: body.password,
            tipoUsuario: body.tipoUsuario,
            estado: "activo"
          };
          usuarioReniec = null;
          usuarioBD = null;

          if (!(tipoUsuario == "paciente")) {
            _context3.next = 12;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(Paciente.findOne({
            dni: dni
          }));

        case 9:
          usuarioBD = _context3.sent;
          _context3.next = 20;
          break;

        case 12:
          if (!(tipoUsuario == "doctor")) {
            _context3.next = 18;
            break;
          }

          _context3.next = 15;
          return regeneratorRuntime.awrap(Doctor.findOne({
            dni: dni
          }));

        case 15:
          usuarioBD = _context3.sent;
          _context3.next = 20;
          break;

        case 18:
          res.status(400).json({
            error: "Tipo de usuario no valido"
          });
          return _context3.abrupt("return");

        case 20:
          if (!(usuarioBD != null)) {
            _context3.next = 23;
            break;
          }

          res.status(400).json({
            error: "El DNI ya ha sido registrado"
          });
          return _context3.abrupt("return");

        case 23:
          _context3.prev = 23;
          _context3.t0 = regeneratorRuntime;
          _context3.next = 27;
          return regeneratorRuntime.awrap(fetch("https://frozen-hollows-68632.herokuapp.com/api/v1/dni/" + datosUsuario.dni.trim() + "?token=abcxyz"));

        case 27:
          _context3.t1 = _context3.sent.json();
          _context3.next = 30;
          return _context3.t0.awrap.call(_context3.t0, _context3.t1);

        case 30:
          usuarioReniec = _context3.sent;
          _context3.next = 37;
          break;

        case 33:
          _context3.prev = 33;
          _context3.t2 = _context3["catch"](23);
          res.status(400).json({
            error: "DNI no registrado en la RENIEC"
          });
          return _context3.abrupt("return");

        case 37:
          datosUsuario.nombre = usuarioReniec.nombres;
          datosUsuario.apellido = usuarioReniec.apellidoPaterno + " " + usuarioReniec.apellidoMaterno;
          _context3.next = 41;
          return regeneratorRuntime.awrap(getPasswordBcrypt(datosUsuario.password));

        case 41:
          datosUsuario.password = _context3.sent;
          nuevoUsuario = null;

          if (!(tipoUsuario == "paciente")) {
            _context3.next = 53;
            break;
          }

          historiaClinica = new HistoriaClinica();
          _context3.next = 47;
          return regeneratorRuntime.awrap(historiaClinica.save());

        case 47:
          datosUsuario.telefonoFamiliar = body.telefonoFamiliar;
          datosUsuario.direccion = body.direccion;
          datosUsuario.historiaClinica = historiaClinica._id;
          nuevoUsuario = new Paciente(datosUsuario);
          _context3.next = 54;
          break;

        case 53:
          if (tipoUsuario == "doctor") {
            datosUsuario.yearXp = body.yearXp;
            datosUsuario.especialidad = body.especialidad;
            nuevoUsuario = new Doctor(datosUsuario);
          }

        case 54:
          _context3.next = 56;
          return regeneratorRuntime.awrap(nuevoUsuario.save());

        case 56:
          if (!(tipoUsuario == "doctor")) {
            _context3.next = 61;
            break;
          }

          _context3.next = 59;
          return regeneratorRuntime.awrap(generadorController.generarDatosDoctor(nuevoUsuario));

        case 59:
          _context3.next = 64;
          break;

        case 61:
          if (!(tipoUsuario == "paciente")) {
            _context3.next = 64;
            break;
          }

          _context3.next = 64;
          return regeneratorRuntime.awrap(generadorController.generarDatosPaciente(nuevoUsuario));

        case 64:
          res.status(201).json({
            data: req.body
          });

        case 65:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[23, 33]]);
};

module.exports.login_post = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.login_get = function (req, res, next) {
  res.render("Administrador/loginadmin");
};

function getPasswordBcrypt(password) {
  var salt;
  return regeneratorRuntime.async(function getPasswordBcrypt$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 2:
          salt = _context5.sent;
          return _context5.abrupt("return", bcrypt.hash(password, salt));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}